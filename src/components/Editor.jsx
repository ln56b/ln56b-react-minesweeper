import React, { useReducer, useState } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"

const LEVELS = {
	Beginner: "beginner",
	Intermediate: "intermediate",
	Expert: "expert",
	Custom: "custom"
}

const initialFormState = {
	level: LEVELS.Beginner,
	marks: false
}

const formReducer = (state, event) => {
	if (event.reset) {
		return {
			level: LEVELS.Beginner,
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
								{["Height", "Width", "Mines"].map((name, id) => (
									<TableCell align='right' key={id}>
										{name}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>
									<div className='radio'>
										<label>
											<p>{LEVELS.Beginner}</p>
											<input
												type='radio'
												name='level'
												value={LEVELS.Beginner}
												checked={formData.level === LEVELS.Beginner}
												onChange={handleChange}
											/>
										</label>
									</div>
								</TableCell>
								<TableCell align='right'>
									<input name='height' value={9} readOnly />
								</TableCell>
								<TableCell align='right'>
									<input name='height' value={9} readOnly />
								</TableCell>
								<TableCell align='right'>
									<input name='height' value={10} readOnly />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component='th' scope='level'>
									<div className='radio'>
										<label>
											<p>{LEVELS.Intermediate}</p>
											<input
												type='radio'
												name='level'
												value={LEVELS.Intermediate}
												checked={formData.level === LEVELS.Intermediate}
												onChange={handleChange}
											/>
										</label>
									</div>
								</TableCell>
								<TableCell align='right'>
									<input name='height' value={16} readOnly />
								</TableCell>
								<TableCell align='right'>
									<input name='height' value={16} readOnly />
								</TableCell>
								<TableCell align='right'>
									<input name='height' value={40} readOnly />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component='th' scope='level'>
									<div className='radio'>
										<label>
											<p>{LEVELS.Expert}</p>
											<input
												type='radio'
												name='level'
												value={LEVELS.Expert}
												checked={formData.level === LEVELS.Expert}
												onChange={handleChange}
											/>
										</label>
									</div>
								</TableCell>
								<TableCell align='right'>
									<input name='height' value={16} readOnly />
								</TableCell>
								<TableCell align='right'>
									<input name='height' value={30} readOnly />
								</TableCell>
								<TableCell align='right'>
									<input name='height' value={99} readOnly />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell component='th' scope='level'>
									<div className='radio'>
										<label>
											<p>{LEVELS.Custom}</p>
											<input
												type='radio'
												name='level'
												value={LEVELS.Custom}
												checked={formData.level === LEVELS.Custom}
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
										disabled={formData.level !== LEVELS.Custom}
										type='number'
										min={1}
										max={50}
									/>
								</TableCell>
								<TableCell align='right'>
									<input
										name='width'
										onChange={handleChange}
										value={formData.width || ""}
										disabled={formData.level !== LEVELS.Custom}
										type='number'
										min={1}
										max={50}
									/>
								</TableCell>
								<TableCell align='right'>
									<input
										name='mines'
										onChange={handleChange}
										value={formData.mines || ""}
										disabled={formData.level !== LEVELS.Custom}
										type='number'
										min={1}
										max={200}
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
