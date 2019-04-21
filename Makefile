project ?= whelpton-electric
version ?= auto

stage-firebase:
	PATH=$(PATH):$(HOME)/bin grow deploy -f staging
	firebase use staging
	firebase deploy

deploy-firebase:
	PATH=$(PATH):$(HOME)/bin grow deploy -f prod
	firebase use prod
	firebase deploy
