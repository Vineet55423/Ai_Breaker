// State management
let selectedRating = '';
let selectedCategories = [];

// Rating buttons
const ratingButtons = document.querySelectorAll('.rating-button');
ratingButtons.forEach(button => {
    button.addEventListener('click', () => {
        ratingButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedRating = button.dataset.rating;
    });
});

// Category buttons
const categoryButtons = document.querySelectorAll('.category-button');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        const isSelected = button.classList.contains('selected');

        if (isSelected) {
            button.classList.remove('selected');
            selectedCategories = selectedCategories.filter(c => c !== category);
            document.getElementById(`${category}Card`).classList.add('hidden');
        } else {
            button.classList.add('selected');
            selectedCategories.push(category);
            document.getElementById(`${category}Card`).classList.remove('hidden');
        }
    });
});

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    toastMessage.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Clear form
document.getElementById('clearBtn').addEventListener('click', () => {
    // Clear rating
    ratingButtons.forEach(btn => btn.classList.remove('selected'));
    selectedRating = '';

    // Clear categories
    categoryButtons.forEach(btn => btn.classList.remove('selected'));
    selectedCategories = [];

    // Hide category cards
    document.getElementById('functionalityCard').classList.add('hidden');
    document.getElementById('layoutCard').classList.add('hidden');
    document.getElementById('trackingCard').classList.add('hidden');

    // Clear textareas
    document.getElementById('functionalityFeedback').value = '';
    document.getElementById('layoutFeedback').value = '';
    document.getElementById('trackingFeedback').value = '';
    document.getElementById('additionalComments').value = '';
});

// Form submission
document.getElementById('feedbackForm').addEventListener('submit', (e) => {
    e.preventDefault();

    if (!selectedRating) {
        showToast('Please provide a rating', 'error');
        return;
    }

    if (selectedCategories.length === 0) {
        showToast('Please select at least one feedback category', 'error');
        return;
    }

    showToast('Thank you for your feedback! We appreciate your input.', 'success');

    // Reset form after successful submission
    setTimeout(() => {
        document.getElementById('clearBtn').click();
    }, 1000);
});