import React from 'react'
import Thumbnail from './Thumbnail'

const Restaurant = ({key, name, thumb, locality, address, cuisines, cost , rating, votes, rating_color }) => {
	return (
		<div className="restaurant-tile">
			<h2 className="rest-name">{name}</h2>
			<Thumbnail thumbnailURL={thumb} restName={name}/>
			<div className="rest-details">
				<div className="rest-loc">{locality}</div>
				<div className="rest-add">{address}</div>
				<hr/>
				<div className="rest-cusines"><strong>CUISINES:</strong> {cuisines}</div>
				<div className="rest-cost"><strong>COST FOR TWO:</strong> Rs.{cost}</div>
				<div className="rest-rating">
					<div>{votes} votes</div>
					<p style={{backgroundColor: `${rating_color}`}}>{rating}/5</p>
				</div>
			</div>
		</div>
	)
}

export default Restaurant
