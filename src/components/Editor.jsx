import React from "react"

function Editor() {
	return (
		<div>
			<p>Editor component works</p>
			<div>
				<form noValidate autoComplete='off'>
					<input name='rows' type='text' />
					<input name='cols' type='text' />
					<input name='mines' type='text' />
					<button>Submit</button>
				</form>
			</div>
		</div>
	)
}

export default Editor
