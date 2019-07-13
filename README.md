# READMET
## usersテーブル
 |Column|Type|Options|
 |------|----|-------|
 |email|string|null: false|
 |password|string|null: false|
 |nickname|string|null: false|
 ### Association
 - has_many :groups
 - has_many :messages

## groupsテーブル
 |Column|Type|Options|
 |------|----|-------|
 |name|text|null: false|
 |user_id|integer|null: false, foreign_key: true|
 ### Association
 - belongs_to :user
 - has_many :members
 - has_many :messages

 ## messagesテーブル
 |Column|Type|Options|
 |------|----|-------|
 |body|text|null: false|
 |image|string|
 |group_id|integer|null: false, foreign_key: true|
 |user_id|integer|null:false, foreign_key: true|
 ### Association
 - belongs_to :user
 - belongs_to :group
 - has_many :messages_tags
 - has_many :tags, throuth: :messages_tags

### tagsテーブル
 |Column|type|Options|
 |------|----|-------|
 |text|text|null: false|
 ### Asociation 
 - has_many :messages_tags
 - has_many :messages, thorough: :messages_tags

## messages_tagsテーブル
 |Column|type|Options|
 |------|----|-------|
 |tags_id|integer|null: false, foreign_key: true|
 |messages_id|integer|null: false, foreign_key: true|
 ### Association
 - belongs_to :tag
 - belongs_to :message
 
## membersテーブル
  |Column|Type|Options|
  |------|----|-------|
  |user_id|integer|null: false,foreign_key: true|
  |group_id|integer|null: false, foreign_key: true|
### Association
 - belongs_to :group
 - belongs_to :user


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
