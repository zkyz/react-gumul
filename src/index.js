import React from 'react'
import ReactDOM from 'react-dom'
import Gumul from './Gumul'

import './index.css'

/*
 const head = (
 <Head>
 <Row>
 <Column colSpan="3">Persona</Column>
 <Column rowSpan="3" data-column="hasOwnCells" data-format="number">cells</Column>
 <Column colSpan="2">account</Column>
 <Column rowSpan="3">ip</Column>
 <Column rowSpan="3" format="bool">a u kid?</Column>
 <Column rowSpan="3">city</Column>
 <Column rowSpan="3">state</Column>
 <Column rowSpan="2" colSpan="2">address</Column>
 <Column rowSpan="3">words</Column>
 </Row>
 <Row>
 <Column colSpan="2">name</Column>
 <Column rowSpan="2" name="birthday" format="date" pattern="yyyy-MM-dd(HH:mm)">birthday</Column>
 <Column rowSpan="2" name="id">id</Column>
 <Column rowSpan="2">pin</Column>
 </Row>
 <Row>
 <Column name="fname">first</Column>
 <Column name="lname">last</Column>
 <Column>street</Column>
 <Column>zip</Column>
 </Row>
 </Head>
 )
 */


const root = document.getElementById('root')

ReactDOM.render(
	<Gumul id="test"/>,
	root
)
