import React, { useReducer, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"

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
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label='simple table'>
						<TableHead>
							<TableRow>
								<TableCell>Levels</TableCell>
								<TableCell align='right'>Height</TableCell>
								<TableCell align='right'>Width</TableCell>
								<TableCell align='right'>Mines</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{/* <fieldset disabled={submitting}> */}
							<TableRow>
								<TableCell>
									<div className='radio'>
										<label>
											<p>{levelsEnum.Beginner}</p>
											<input
												type='radio'
												name='level'
												value={levelsEnum.Beginner}
												checked={formData.level === levelsEnum.Beginner}
												onChange={handleChange}
											/>
										</label>
									</div>
								</TableCell>
								<TableCell align='right'>9</TableCell>
								<TableCell align='right'>9</TableCell>
								<TableCell align='right'>10</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component='th' scope='level'>
									<div className='radio'>
										<label>
											<p>{levelsEnum.Intermediary}</p>
											<input
												type='radio'
												name='level'
												value={levelsEnum.Intermediary}
												checked={formData.level === levelsEnum.Intermediary}
												onChange={handleChange}
											/>
										</label>
									</div>
								</TableCell>
								<TableCell align='right'>16</TableCell>
								<TableCell align='right'>16</TableCell>
								<TableCell align='right'>40</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component='th' scope='level'>
									<div className='radio'>
										<label>
											<p>{levelsEnum.Expert}</p>
											<input
												type='radio'
												name='level'
												value={levelsEnum.Expert}
												checked={formData.level === levelsEnum.Expert}
												onChange={handleChange}
											/>
										</label>
									</div>
								</TableCell>
								<TableCell align='right'>16</TableCell>
								<TableCell align='right'>30</TableCell>
								<TableCell align='right'>99</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component='th' scope='level'>
									<div className='radio'>
										<label>
											<p>{levelsEnum.Custom}</p>
											<input
												type='radio'
												name='level'
												value={levelsEnum.Custom}
												checked={formData.level === levelsEnum.Custom}
												onChange={handleChange}
											/>
										</label>
									</div>
								</TableCell>
								<TableCell align='right'>
									<input
										name='height'
										onChange={handleChange}
										value={formData.height || ""}
									/>
								</TableCell>
								<TableCell align='right'>
									<input
										name='height'
										onChange={handleChange}
										value={formData.width || ""}
									/>
								</TableCell>
								<TableCell align='right'>
									<input
										name='height'
										onChange={handleChange}
										value={formData.mines || ""}
									/>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell align='center' colSpan={4}>
									<label>
										<p>Marks?</p>
										<input
											checked={formData["marks"] || false}
											name='marks'
											onChange={handleChange}
											type='checkbox'
										/>
									</label>
								</TableCell>
							</TableRow>
							{/* </fieldset> */}
						</TableBody>
					</Table>
				</TableContainer>
				<div align='center'>
					<Button variant='contained' type='submit' disabled={submitting}>
						Submit
					</Button>
				</div>
			</form>
		</div>
	)
}

export default Editor
