aws s3 cp ./public/ s3://prod-byte-bet-webpage/ --recursive
aws cloudfront create-invalidation --distribution-id E1NWWSK2WEQ9JH --paths "/*"
