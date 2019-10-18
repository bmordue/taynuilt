resource "aws_s3_bucket" "live_site_bucket" {
  bucket = "site.pentland.ml"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}

resource "aws_s3_bucket" "staging_site_bucket" {
  bucket = "site-stg.pentland.ml"
  acl    = "public-read"

  website {
    index_document = "index.html"
    error_document = "error.html"
  }
}
