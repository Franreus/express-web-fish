const fishList = document.querySelector('.fish-list')
fetch(`https://fishbase.ropensci.org/species?limit=15&offset=${(Math.floor(Math.random() * 1000) + 1).toString()}`)
	.then(response => response.json())
	.then(data => {
		if(data['error'] === null){
			data['data'].forEach(fish => {
					if(fish['image'] === null) fish['image'] = 'https://bitsofco.de/content/images/2018/12/broken-1.png'
					fishList.innerHTML += `<div class="fish">
						<a href="fish/${fish['SpecCode'].toString()}">
							<div class="fish-title">
								${fish['Species'].charAt(0).toUpperCase() + fish['Species'].slice(1)}
							</div>
							<img src="${fish['image']}"/>
						</a>
					</div>`
		  })
		}
	}).catch(err => console.log(err))