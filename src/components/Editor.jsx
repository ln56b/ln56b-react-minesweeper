import React, { useReducer, useState } from "react"

const levelsEnum = {
	Beginner: "beginner",
	Intermediary: "intermediary",
	Expert: "expert",
	Custom: "custom"
}

const initialFormState = {
	level: levelsEnum.Beginner,
	marks: false
}

const formReducer = (state, event) => {
	if (event.reset) {
		return {
			level: levelsEnum.Beginner,
			marks: false
		}
	}
	return {
		...state,
		[event.name]: event.value
	}
}

function Editor() {
	const [formData, setFormData] = useReducer(formReducer, initialFormState)
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
								name='level'
								value={levelsEnum.Beginner}
								checked={formData.level === levelsEnum.Beginner}
								onChange={handleChange}
							/>
							Beginner
						</label>
					</div>

					<div className='radio'>
						<label>
							<input
								type='radio'
								name='level'
								value={levelsEnum.Intermediary}
								checked={formData.level === levelsEnum.Intermediary}
								onChange={handleChange}
							/>
							Intermediary
						</label>
					</div>
					<div className='radio'>
						<label>
							<input
								type='radio'
								name='level'
								value={levelsEnum.Expert}
								checked={formData.level === levelsEnum.Expert}
								onChange={handleChange}
							/>
							Expert
						</label>
					</div>
					<div className='radio'>
						<label>
							<input
								type='radio'
								name='level'
								value={levelsEnum.Custom}
								checked={formData.level === levelsEnum.Custom}
								onChange={handleChange}
							/>
							Custom
						</label>
					</div>
				</fieldset>
				<label>
					<p>Marks?</p>
					<input
						checked={formData["marks"] || false}
						name='marks'
						onChange={handleChange}
						type='checkbox'
					/>
				</label>
				<button type='submit' disabled={submitting}>
					Submit
				</button>
			</form>
		</div>
	)
}

export default Editor
