const fishInfo = document.querySelector('.fish-info')
if(fishInfo.dataset.spec){
	fetch(`https://fishbase.ropensci.org/species/${fishInfo.dataset.spec}?`)
	.then(response => response.json())
	.then(data => {
		if(data['error'] === null){
			const fish = data['data'][0]
			if(fish['Comments'] === null) fish['Comments'] = 'There is no description'
			fishInfo.innerHTML += `<h1>${fish['Species'].charAt(0).toUpperCase() + fish['Species'].slice(1)}</h1>
				<p class="description"><b>Author:</b> ${fish['Author']}<br/><br/>${fish['Comments']}</p>
				<img src="${fish['image']}"/>
			`
		}else fishInfo.innerHTML = '<h1>Fish Not found</h1>'
	}).catch(err => console.log(err))
}