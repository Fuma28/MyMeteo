document.getElementById("search-button").addEventListener("click", search);
async function search(event) {
    event.preventDefault();

    document.getElementById("form").setAttribute("action", "/search");
    document.getElementById("city").value = document.getElementById("search-text").value;
    document.getElementById("search-text").value = '';
    document.getElementById("form").submit();

    return false;
}