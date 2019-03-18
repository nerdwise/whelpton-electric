project ?= whelpton-electric
version ?= auto

staging_s3_bucket = https://whelpton-electric.s3-us-west-2.amazonaws.com
prod_s3_bucket = TODO

develop:
	pip install awscli

stage-s3:
	PATH=$(PATH):$(HOME)/bin grow deploy -f staging
	aws s3 cp --recursive build s3://$(staging_s3_bucket)

deploy-s3:
	PATH=$(PATH):$(HOME)/bin grow deploy -f prod
	aws s3 cp --recursive build s3://$(prod_s3_bucket)
