
BUILD_DIR=build
SRC_DIR=src

all: .FORCE

.FORCE: clean build

build:
	tsc --project .

clean:
	rm -rf build
