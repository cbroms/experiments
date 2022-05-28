
red="\e[0;91m"
blue="\e[0;94m"
green="\e[0;92m"
reset="\e[0m"

experiments="${green}@@@ experiments: "

cleanup() {
   # any cleanup
}

trap cleanup EXIT

# build the output and sync with object storage
build() {
    export AWS_PROFILE=thoughts

    printf "${experiments}${blue}Loading config file...${reset}\n"
    . experiments.config 

    if [ ! -d "${EXPERIMENT_SOURCE_DIR}$builddir" ]; then
        printf "${experiments}${red}Directory ${EXPERIMENT_SOURCE_DIR}${builddir} doesn't exist! Exiting...${reset}\n"
        exit
    fi

    printf "${experiments}${blue}Building ${builddir}...\n"
    cd ${EXPERIMENT_SOURCE_DIR}${builddir} && npm install && npm run build

    printf "${experiments}${blue}Syncing build to object storage...${reset}\n"
    cd ${EXPERIMENT_BUILD_DIR} && aws s3 sync . ${S3_BUCKET}${S3_EXPERIMENT_DIR}${builddir} --acl public-read --exclude ".DS_Store" && cd ../..

    printf "${experiments}${blue}Syncing index to object storage...${reset}\n"
    aws s3 cp index.html ${S3_BUCKET}${S3_EXPERIMENT_INDEX}index.html --acl public-read

    printf "${experiments}${blue}Export complete, exiting...${reset}\n"
    exit 
}

builddir=

while [ "$1" != "" ]; do
    case $1 in
    -b | --build)
        builddir="$2"; build; shift 2 ;;
    *)  break ;;
    esac 
done