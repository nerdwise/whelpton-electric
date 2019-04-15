project ?= whelpton-electric
version ?= auto

staging_s3_bucket = whelpton-electric
prod_s3_bucket = TODO

develop:
	pip install awscli

stage-s3:
	PATH=$(PATH):$(HOME)/bin grow deploy -f staging
	aws s3 cp --recursive build s3://$(staging_s3_bucket)
	firebase deploy

deploy-s3:
	PATH=$(PATH):$(HOME)/bin grow deploy -f prod
	aws s3 cp --recursive build s3://$(prod_s3_bucket)
	firebase deploy