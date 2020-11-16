const fishInfo = document.querySelector('.fish-info')
if(fishInfo.dataset.spec){
	fetch(`https://fishbase.ropensci.org/species/${fishInfo.dataset.spec}?`)
	.then(response => response.json())
	.then(data => {
		if(data['error'] === null){
			const fish = data['data'][0]
			if(fish['Comments'] === null) fish['Comments'] = 'There is no description'
			fishInfo.innerHTML += `<h2>${fish['Species'].charAt(0).toUpperCase() + fish['Species'].slice(1)}</h2>
				<p class="description"><b>Author:</b> ${fish['Author']}<br/><br/>${fish['Comments']}</p>
				<img src="${fish['image']}"/>
				<div class="add-fish">Add Fish to favorites</div>`
			const addFishButton = document.querySelector('.add-fish')
			addFishButton.addEventListener('click', async () => {
				await fetch('../api/fishes',{
					method: "POST",
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					  },
					body: JSON.stringify({
						id:fishInfo.dataset.spec,
						specie:fish['Species'].charAt(0).toUpperCase() + fish['Species'].slice(1),
						author:fish['Author'],
						description:fish['Comments'],
						image:fish['image']
					})
				}).then(res => res.text()).then(data => alert(data)).catch(e => console.log(e))
				//alert('Added')
			})
		}else fishInfo.innerHTML = '<h2>Fish Not found</h2>'
	}).catch(err => console.log(err))
}