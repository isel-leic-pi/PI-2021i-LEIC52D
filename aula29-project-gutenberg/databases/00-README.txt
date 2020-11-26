##
## Run the following command to convert XML from ../data/cache/epub/ to JSON.
##
## 1. check tests
## 
npm run test
## 
## 2. check it runs
## 
node rdf-to-bulk.js ../data/cache/epub/ | head
## 
## 3. Now convert to LDJ line delimited json. It takes some minutes. 
##  When it’s finished, the bulk_pg.ldj file should be about 14 MB
## 
node rdf-to-bulk.js ../data/cache/epub/ > ../data/bulk_pg.ldj

##
## Insert previous JSON documents from bulk_pg.ldj into ElasticSearch database.
##
## 1. First create index books
## 
curl -X PUT http://localhost:9200/books
##
## 2. Insert JSON documents from bulk_pg.ldj
## 
curl -X POST -H "Content-Type: application/json" --data-binary "@bulk_pg.ldj" http://localhost:9200/books/_doc/_bulk