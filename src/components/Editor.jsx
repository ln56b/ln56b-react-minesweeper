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

function Editor({ submitForm }) {
	const [formData, setFormData] = useReducer(formReducer, initialFormState)
	const [submitting, setSubmitting] = useState(false)

	function handleSubmit(event) {
		event.preventDefault()
		setSubmitting(true)

		if (formData.level === LEVELS.Beginner) {
			formData.height = 9
			formData.width = 9
			formData.mines = 10
		} else if (formData.level === LEVELS.Intermediate) {
			formData.height = 16
			formData.width = 16
			formData.mines = 40
		} else if (formData.level === LEVELS.Expert) {
			formData.height = 16
			formData.width = 30
			formData.mines = 99
		}

		submitForm(formData)
		setTimeout(() => {
			setSubmitting(false)

			setFormData({
				reset: true
			})
		}, 3000)
	}

	function handleChange(event) {
		const isCheckbox = event.target.type === "checkbox"
		setFormData({
			name: event.target.name,
			value: isCheckbox ? event.target.checked : event.target.value
		})
	}

	const createReadonlyCell = (name, value) => (
		<TableCell align='right'>
			<input name={name} value={value} readOnly={true} />
		</TableCell>
	)

	const createNumberCell = (name, value, min, max) => (
		<TableCell align='right'>
			<input
				name={name}
				onChange={handleChange}
				value={value || ""}
				disabled={formData.level !== LEVELS.Custom}
				type='number'
				min={min}
				max={max}
			/>
		</TableCell>
	)

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
								{["Height", "Width", "Mines"].map((name) => (
									<TableCell align='right' key={name}>
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
								{createReadonlyCell("height", 9)}
								{createReadonlyCell("width", 9)}
								{createReadonlyCell("mines", 10)}
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
								{createReadonlyCell("height", 16)}
								{createReadonlyCell("width", 16)}
								{createReadonlyCell("mines", 40)}
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
								{createReadonlyCell("height", 16)}
								{createReadonlyCell("width", 30)}
								{createReadonlyCell("mines", 99)}
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
								{createNumberCell("height", formData.height, 1, 50)}
								{createNumberCell("width", formData.width, 1, 50)}
								{createNumberCell("mines", formData.mines, 1, 200)}
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
