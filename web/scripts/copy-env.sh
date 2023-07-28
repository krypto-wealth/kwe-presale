for file in ./envs/.*.example; do 
    cp -- "$file" "${file%.example}"
done