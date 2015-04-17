class Document
  include Mongoid::Document
  field :tweet, type: String
  field :status, default: :real
  field :number_of_followers, type: Integer, default: 0
  field :number_of_friends, type: Integer, default: 0
  field :user_verified, type: Integer, default: 0
  field :created_at, type: Time, default: Time.now
  
  validates_presence_of :tweet
  validates_inclusion_of :status, :in => [:real, :test, :train]

  
  belongs_to :sentiment
  belongs_to :company
  
  after_create :classify, unless: :training? 
  after_update :aggregate_document
  after_update :apply_sentiment_to_same_documents, if: :training? 

  
  def self.positive
    where(sentiment_id: Sentiment.positive.id)
  end
  
  def self.negative
    where(sentiment_id: Sentiment.negative.id)
  end
  
  def self.neutral
    where(sentiment_id: Sentiment.neutral.id)
  end
  
  def training?
    status == :train
  end
  
  def self.training_set
    where(status: :train)
  end
  
  def real_data?
    status == :real
  end
  
  def self.real_data
    where(status: :real)
  end
  
  def test?
    status == :test
  end
  
  def self.testing_set
    where(status: :test)
  end
  
  def sentiment_name
    sentiment.category
  end
  
  def corpus
    #indexed text and query terms must have the same format
    normalize tokenize
  end
  
  def tokenize
    tweet.split(" ").map {|word| word.downcase.gsub(/[^а-я]/, '')}
  end
  
  def normalize(words = [])
    remove_duplicates(reverse_negations(stemming(words)))
  end
  
  def reverse_negations(words = [])
    (1..words.count).each do |counter|
      if words[counter - 1] == "не"
        words[counter] = "не_" + words[counter]
        words.delete_at(counter - 1)
      end
    end
    return words
  end
  
  def stemming(words = [])
    Lingua.stemmer(words, :language => "ru" )
  end
  
  def remove_duplicates(words = [])
    words.uniq.reject{|w| w.length < 2 }
  end
  
  def self.compute_likelihood(sentiment, word)
   return 0 if Word.count == 0
   (sentiment.words.where(name: word).sum(:frequency)+ 1).fdiv(sentiment.words.sum(:frequency) + Word.pluck(:name).uniq.count)
  end
  
  def naive_bayes_classifier
    probabilies = {}
    Sentiment.all.each do |sentiment|
      if sentiment.words.count > 0
        probability = Math.log(sentiment.compute_prior) 
        corpus.each do |word|
          probability += Math.log(Document.compute_likelihood(sentiment, word))
        end
        probabilies[sentiment.id] = probability 
      end
    end
    return probabilies
  end
  

  
  def most_probable_sentiment
    Sentiment.find(naive_bayes_classifier.max_by{|k,v| v}[0]) unless naive_bayes_classifier.empty?
  end
  
  def classify
    # calculate probabilities of different classes
    set(sentiment_id: most_probable_sentiment.id) 
    
    #put all words in related mega document
    aggregate_document
  end
  
  def apply_sentiment_to_same_documents
    company.documents.where(tweet: tweet, sentiment_id: nil).each {|document| document.set(sentiment_id: sentiment_id)}
  end
  
  def add_words_to_mega_vocabulary
    corpus.each { |word| sentiment.words.find_or_create_by(name: word).inc(frequency: 1) }   
  end
  
  def created_at_msk
    created_at.in_time_zone("Moscow")
  end
  
  def aggregate_document
    if created_at_msk.hour > 18
      time = Time.new(created_at_msk.tomorrow.year, created_at_msk.tomorrow.month, created_at_msk.tomorrow.day, 10,0)
      company.clusters.find_or_create_by(created_at: created_at_msk.to_date.tomorrow).insert_sentiment(sentiment_name, time)
    elsif created_at_msk.hour < 10
      time = Time.new(created_at_msk.year, created_at_msk.month, created_at_msk.day, 10,0)
      company.clusters.find_or_create_by(created_at: created_at_msk.to_date).insert_sentiment(sentiment_name, time)
    else
      company.clusters.find_or_create_by(created_at: created_at_msk.to_date).insert_sentiment(sentiment_name, created_at_msk)
    end
    
    add_words_to_mega_vocabulary
    destroy
  end
  
  
end
