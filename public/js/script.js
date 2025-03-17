
document.addEventListener('DOMContentLoaded', () => { 
    const proteinFilter = document.getElementById('protein-filter');
    const recipeRows = document.querySelectorAll('.recipe-row');

    if (proteinFilter && recipeRows) { 
        proteinFilter.addEventListener('change', () => {
            const selectedProtein = proteinFilter.value;

            recipeRows.forEach(row => {
                const proteinType = row.dataset.protein;

                if (selectedProtein === 'All' || proteinType === selectedProtein) {
                    row.style.display = ''; 
                } else {
                    row.style.display = 'none'; 
                }
            });
        });
    }
});
