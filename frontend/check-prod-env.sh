if [[ -z "$REACT_APP_BACKEND_URL" ]]; then
    echo "Must provide REACT_APP_BACKEND_URL in environment" 1>&2
    echo "e.g. REACT_APP_BACKEND_URL=https://backend-url.ext docker-compose build frontend" 1>&2
    exit 1
fi
