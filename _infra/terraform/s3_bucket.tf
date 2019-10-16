resource "aws_s3_bucket" "my_bucket" {
  bucket = "site.pentland.ml"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"

  }
}
