function toggleReadMore(event) {
    event.preventDefault();
    const contentId = event.target.id.replace('read-more-', 'post-content-');
    const content = document.getElementById(contentId);
    const readMoreSpan = event.target;

    // Toggle content visibility
    if (content.classList.contains('line-clamp-1')) {
        content.classList.remove('line-clamp-1'); // Show full content
        readMoreSpan.style.display = 'none'; // Hide the read more link
    } else {
        content.classList.add('line-clamp-1'); // Collapse to one line
        readMoreSpan.style.display = 'inline'; // Show the read more link again
    }
}