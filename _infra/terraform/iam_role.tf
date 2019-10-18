resource "aws_iam_role" "role" {
  name = "pentland-site-upload-role"

  assume_role_policy = <<ROLEPOLICY
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Principal": {
        "Service": "s3.amazonaws.com"
      },
      "Effect": "Allow",
      "Sid": ""
    }
  ]
}
ROLEPOLICY
}

resource "aws_iam_policy" "policy" {
  name        = "s3-bucket-policy"
  description = "A test policy"

  policy = <<EOF
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "s3:*",
            "Resource": [
                "${aws_s3_bucket.live_site_bucket.arn}",
                "${aws_s3_bucket.live_site_bucket.arn}/*",
                "${aws_s3_bucket.staging_site_bucket.arn}",
                "${aws_s3_bucket.staging_site_bucket.arn}/*"
            ]
        }
    ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "role-policy-attachment" {
  role       = "${aws_iam_role.role.name}"
  policy_arn = "${aws_iam_policy.policy.arn}"
}
