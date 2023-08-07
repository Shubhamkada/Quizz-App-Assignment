console.clear();

var answer_key = {};

// function to generate HTML elements
function generate_quiz(data)
{
	let question_div, temp_element;
	let questions_container = document.getElementById("questions_container");

	for(let i = 0; i < data.length; i++)
	{
		// main div
		question_div = document.createElement("div");
		question_div.id = "q_" + i;
		question_div.classList.add("row", "question_box");

		// question - p
		temp_element = document.createElement("p");
		temp_element.classList.add("question");
		temp_element.appendChild(document.createTextNode("Q" + (i + 1) + ". " + data[i]["question"]));
		question_div.appendChild(temp_element);
		
		let temp_option_element;
		for(let j = 0; j < data[i]["options"].length; j++)
		{
			temp_option_element = document.createElement("div");
			temp_option_element.classList.add("option");

			// radio input
			temp_element = document.createElement("input");
			temp_element.id = "option_" + i + "_" + j;
			temp_element.name = question_div.id;
			temp_element.classList.add("form-check-input");
			temp_element.setAttribute("type", "radio");
			temp_element.setAttribute("value", j);
			temp_option_element.appendChild(temp_element);

			//label
			temp_element = document.createElement("label");
			temp_element.classList.add("form-check-label");
			temp_element.setAttribute("for", "option_" + i + "_" + j);
			temp_element.appendChild(document.createTextNode(data[i]["options"][j]));
			temp_option_element.appendChild(temp_element);

			question_div.appendChild(temp_option_element);
		}

		// record answer to answer key
		answer_key[question_div.id] = data[i]["answer"];

		questions_container.appendChild(question_div);
	}
}

// function to handle state change
function ready_state_change(event)
{
	if(event.target.readyState == 4 && event.target.status == 200)
	{
		if(event.target.status == 200)
		{
			console.log("API request successfull");
			var quiz_data = JSON.parse(event.target.response);
			generate_quiz(quiz_data);
		}
	}
}

// AJAX request to get quiz questions
let request = new XMLHttpRequest();
request.open("GET", "https://5d76bf96515d1a0014085cf9.mockapi.io/quiz");
request.addEventListener("readystatechange", ready_state_change);
request.send();

// for score card


function calculate_score()
{
	event.preventDefault(); // to cancel form submit

	let score = 0;
	let quiz_form = document.getElementById("quiz");

	for(question in answer_key)
	{
		if(answer_key[question] == quiz_form.elements[question].value) score++;
	}

	document.getElementById("score").innerHTML = score;
}