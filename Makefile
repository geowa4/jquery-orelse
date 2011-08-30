SRC_DIR = src
DIST_DIR = dist
LIB_DIR = lib
JQ_DIR = ${LIB_DIR}/jquery
LATEST_JQ = ${DIST_DIR}/jquery.min.js
PLUGIN = jquery.orelse.js
DIST_FILE = ${DIST_DIR}/${PLUGIN}
SRC_FILE = ${SRC_DIR}/${PLUGIN}

all: clean update_submodules plugin

update_submodules:
	@echo "Updating submodules"
	@if [ -d .git ]; then \
		if git submodule status | grep -q -E '^-'; then \
			git submodule update --init --recursive; \
		else \
			git submodule update --init --recursive --merge; \
		fi; \
	fi;

${DIST_DIR}:
	@echo "Making dist directory"
	@mkdir -p ${DIST_DIR}

${LATEST_JQ}:
	@echo "Building latest jQuery"
	@cd ${JQ_DIR} && $(MAKE)
	@cp -f ${JQ_DIR}/${LATEST_JQ} ${DIST_DIR}/

plugin: ${DIST_DIR} ${LATEST_JQ}
	@echo "Building plugin"
	@cp -f ${SRC_FILE} ${DIST_DIR}/

clean:
	@echo "Removing dist directory"
	@rm -rf ${DIST_DIR}

.PHONY: all update_submodules plugin