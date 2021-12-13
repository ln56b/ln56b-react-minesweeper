import React, { useReducer, useState } from "react"

const formReducer = (state, event) => {
	if (event.reset) {
		return {
			apple: "",
			count: 0,
			name: "",
			"gift-wrap": false
		}
	}
	return {
		...state,
		[event.name]: event.value
	}
}

function Editor() {
	const [formData, setFormData] = useReducer(formReducer, {
		count: 100
	})
	const [level, setLevel] = useState("beginner")

	const [submitting, setSubmitting] = useState(false)

	const handleSubmit = (event) => {
		event.preventDefault()
		setSubmitting(true)

		setTimeout(() => {
			setSubmitting(false)
			setFormData({
				reset: true
			})
		}, 3000)
	}

	const handleChange = (event) => {
		const isCheckbox = event.target.type === "checkbox"
		setFormData({
			name: event.target.name,
			value: isCheckbox ? event.target.checked : event.target.value
		})
	}

	const onLevelChange = (event) => {
		this.setState({
			selectedOption: event.target.value
		})
	}

	return (
		<div className='wrapper'>
			<h1>Customize the board</h1>
			{submitting && (
				<div>
					You are submitting the following:
					<ul>
						{Object.entries(formData).map(([name, value]) => (
							<li key={name}>
								<strong>{name}</strong>: {value.toString()}
							</li>
						))}
					</ul>
				</div>
			)}
			<form onSubmit={handleSubmit}>
				<fieldset disabled={submitting}>
					<label>
						<p>Name</p>
						<input
							name='name'
							onChange={handleChange}
							value={formData.name || ""}
						/>
					</label>
				</fieldset>
				<fieldset disabled={submitting}>
					<div className='radio'>
						<label>
							<input
								type='radio'
								value='beginner'
								checked={level === formData.beginner}
								onChange={onLevelChange}
							/>
							Beginner
						</label>
					</div>

					<div className='radio'>
						<label>
							<input
								type='radio'
								value='intermediary'
								checked={level === formData.intermediary}
								onChange={onLevelChange}
							/>
							Intermediary
						</label>
					</div>
					<div className='radio'>
						<label>
							<input
								type='radio'
								value='expert'
								checked={level === formData.expert}
								onChange={onLevelChange}
							/>
							Expert
						</label>
					</div>
					<div className='radio'>
						<label>
							<input
								type='radio'
								value='custom'
								checked={level === formData.custom}
								onChange={onLevelChange}
							/>
							Expert
						</label>
					</div>
				</fieldset>
				<button type='submit' disabled={submitting}>
					Submit
				</button>
			</form>
		</div>
	)
}

export default Editor
