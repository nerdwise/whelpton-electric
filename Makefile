project ?= whelpton-electric
version ?= auto

build-staging:
	PATH=$(PATH):$(HOME)/bin grow deploy -f staging

build-prod:
	PATH=$(PATH):$(HOME)/bin grow deploy -f prod
