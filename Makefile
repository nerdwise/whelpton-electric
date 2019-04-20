project ?= whelpton-electric
version ?= auto

stage-firebase:
	PATH=$(PATH):$(HOME)/bin grow deploy -f staging
	firebase deploy staging

deploy-firebase:
	PATH=$(PATH):$(HOME)/bin grow deploy -f prod
	firebase deploy
