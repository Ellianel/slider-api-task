import React from 'react'
import { useEffect, useState } from 'react'
import './Slider-styles.css'

const Slider = () => {
	const [avatarIndex, setAvatarIndex] = useState(0)
	const [avatarUrl, setAvatarUrl] = useState('')
	const getAvatar = userName => {
		fetch(`https://api.github.com/search/users?q=${userName}`)
			.then(response => response.json())
			.then(actualData => setAvatarUrl(actualData.items[0].avatar_url))
			.catch(err => {
				console.log(err.message)
			})
	}
	const usersArr = ['gaearon', 'acdlite', 'yyx990803', 'unclebob', 'martinfowler']
	const nextAvatar = () => {
		if (avatarIndex >= 0 && avatarIndex < usersArr.length - 1) {
			setAvatarIndex(avatarIndex + 1)
		} else if (avatarIndex === usersArr.length - 1) {
			setAvatarIndex(0)
		}
	}
	const prevAvatar = () => {
		if (avatarIndex > 0 && avatarIndex <= usersArr.length - 1) {
			setAvatarIndex(avatarIndex - 1)
		} else if (avatarIndex === 0) {
			setAvatarIndex(usersArr.length - 1)
		}
	}
	useEffect(() => {
		getAvatar(usersArr[avatarIndex])
	}, [avatarIndex])

	return (
		<div>
			<div className='container'>
				<button className='prev-arrow' onClick={prevAvatar}>
					Previous
				</button>
				<div className='avatar'>
					<img src={avatarUrl} alt='' />
				</div>
				<button className='next-arrow' onClick={nextAvatar}>
					Next
				</button>
			</div>
		</div>
	)
}
export default Slider
