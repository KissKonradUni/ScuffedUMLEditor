class ClassElement extends HTMLElement {
	constructor() {
		super();

		this.id = Math.random().toString(36).substring(2, 9);
        this.oldName = "Unnamed-" + this.id;
        this.setAttribute("type", "class");
	}

	connectedCallback() {
		var nameLabel = document.createElement("label");
		nameLabel.innerHTML = "Name";
		nameLabel.htmlFor = this.id + "-name";
		this.appendChild(nameLabel);

        this.setAttribute("name", this.oldName);
		var nameField = document.createElement("input");
		nameField.type = "text";
		nameField.value = this.getAttribute("name");
		nameField.id = this.id + "-name";
		nameField.addEventListener("change", () => {
			this.setAttribute("name", nameField.value);
            deleteObjectElement(this.oldName);
			updateJsonObjects(this);
            this.oldName = nameField.value;
		});
		this.appendChild(nameField);

        var positionXLabel = document.createElement("label");
        positionXLabel.innerHTML = "Position X";
        positionXLabel.htmlFor = this.id + "-position-x";
        this.appendChild(positionXLabel);

        this.setAttribute("position-x", "0");
        var positionXField = document.createElement("input");
        positionXField.type = "number";
        positionXField.value = this.getAttribute("position-x");
        positionXField.id = this.id + "-position-x";
        positionXField.addEventListener("keyup", () => {
            this.setAttribute("position-x", positionXField.value);
            updateJsonObjects(this);
        });
        this.appendChild(positionXField);

        var positionYLabel = document.createElement("label");
        positionYLabel.innerHTML = "Position Y";
        positionYLabel.htmlFor = this.id + "-position-y";
        this.appendChild(positionYLabel);

        this.setAttribute("position-y", "0");
        var positionYField = document.createElement("input");
        positionYField.type = "number";
        positionYField.value = this.getAttribute("position-y");
        positionYField.id = this.id + "-position-y";
        positionYField.addEventListener("keyup", () => {
            this.setAttribute("position-y", positionYField.value);
            updateJsonObjects(this);
        });
        this.appendChild(positionYField);

        var propertiesLabel = document.createElement("label");
        propertiesLabel.innerHTML = "Properties";
        propertiesLabel.htmlFor = this.id + "-properties";
        this.appendChild(propertiesLabel);

        this.setAttribute("properties", "");
        var propertiesField = document.createElement("textarea");
        propertiesField.value = "";
        propertiesField.id = this.id + "-properties";
        propertiesField.addEventListener("change", () => {
            this.setAttribute("properties", propertiesField.value);
            updateJsonObjects(this);
        });
        this.appendChild(propertiesField);

        var functionsLabel = document.createElement("label");
        functionsLabel.innerHTML = "Functions";
        functionsLabel.htmlFor = this.id + "-functions";
        this.appendChild(functionsLabel);

        this.setAttribute("functions", "");
        var functionsField = document.createElement("textarea");
        functionsField.value = "";
        functionsField.id = this.id + "-functions";
        functionsField.addEventListener("change", () => {
            this.setAttribute("functions", functionsField.value);
            updateJsonObjects(this);
        });
        this.appendChild(functionsField);

        updateJsonObjects(this);

        var updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.addEventListener("click", () => {
            updateJsonObjects(this);
        });
        this.appendChild(updateButton);

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteObjectElement(this.getAttribute("name"));
            this.remove();
        });
        this.appendChild(deleteButton);

        draw();
	}
}

class CommentElement extends HTMLElement {
    constructor() {
        super();

        this.id = Math.random().toString(36).substring(2, 9);
        this.oldName = "Unnamed-" + this.id;
        this.setAttribute("type", "comment");
    }

    connectedCallback() {
        var nameLabel = document.createElement("label");
        nameLabel.innerHTML = "Name";
        nameLabel.htmlFor = this.id + "-name";
        this.appendChild(nameLabel);

        this.setAttribute("name", this.oldName);
        var nameField = document.createElement("input");
        nameField.type = "text";
        nameField.value = this.getAttribute("name");
        nameField.id = this.id + "-name";
        nameField.addEventListener("change", () => {
            this.setAttribute("name", nameField.value);
            deleteObjectElement(this.oldName);
            updateJsonObjects(this);
            this.oldName = nameField.value;
        });
        this.appendChild(nameField);

        var positionXLabel = document.createElement("label");
        positionXLabel.innerHTML = "Position X";
        positionXLabel.htmlFor = this.id + "-position-x";
        this.appendChild(positionXLabel);

        this.setAttribute("position-x", "0");
        var positionXField = document.createElement("input");
        positionXField.type = "number";
        positionXField.value = this.getAttribute("position-x");
        positionXField.id = this.id + "-position-x";
        positionXField.addEventListener("keyup", () => {
            this.setAttribute("position-x", positionXField.value);
            updateJsonObjects(this);
        });
        this.appendChild(positionXField);

        var positionYLabel = document.createElement("label");
        positionYLabel.innerHTML = "Position Y";
        positionYLabel.htmlFor = this.id + "-position-y";
        this.appendChild(positionYLabel);

        this.setAttribute("position-y", "0");
        var positionYField = document.createElement("input");
        positionYField.type = "number";
        positionYField.value = this.getAttribute("position-y");
        positionYField.id = this.id + "-position-y";
        positionYField.addEventListener("keyup", () => {
            this.setAttribute("position-y", positionYField.value);
            updateJsonObjects(this);
        });
        this.appendChild(positionYField);

        var textLabel = document.createElement("label");
        textLabel.innerHTML = "Text";
        textLabel.htmlFor = this.id + "-text";
        this.appendChild(textLabel);

        this.setAttribute("text", "");
        var textField = document.createElement("textarea");
        textField.value = "";
        textField.id = this.id + "-text";
        textField.addEventListener("change", () => {
            this.setAttribute("text", textField.value);
            updateJsonObjects(this);
        });
        this.appendChild(textField);

        updateJsonObjects(this);

        var updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.addEventListener("click", () => {
            updateJsonObjects(this);
        });
        this.appendChild(updateButton);

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteObjectElement(this.getAttribute("name"));
            this.remove();
        });
        this.appendChild(deleteButton);

        draw();
    }
}

function deleteObjectElement(name) {
    var json_obj = JSON.parse(jsonEditor.getValue());
    var obj_array = json_obj["objects"];

    for (var i = 0; i < obj_array.length; i++) {
        if (obj_array[i]["name"] == name) {
            obj_array.splice(i, 1);
            break;
        }
    }

    jsonEditor.setValue(JSON.stringify(json_obj, null, 4));

    draw();
}

function updateJsonObjects(element) {
	var json_obj = JSON.parse(jsonEditor.getValue());
	var obj_array = json_obj["objects"];

    var props = [];
    (element.getAttribute("properties") ?? "").split("\n").forEach((prop) => {
        props.push({
            text: prop
        });
    });
    var funcs = [];
    (element.getAttribute("functions") ?? "").split("\n").forEach((func) => {
        funcs.push({
            text: func
        });
    });

	var found = false;
	for (var i = 0; i < obj_array.length; i++) {
		if (obj_array[i]["name"] == element.getAttribute("name")) {
			found = true;
			obj_array[i]["type"] = element.getAttribute("type");
            obj_array[i]["pos"]["x"] = Number(element.getAttribute("position-x"));
            obj_array[i]["pos"]["y"] = Number(element.getAttribute("position-y"));
            if (element.getAttribute("type") == "class") {
                obj_array[i]["properties"] = props;
                obj_array[i]["functions"] = funcs;
            } else {
                obj_array[i]["text"] = element.getAttribute("text");
            }
            break;
		}
	}

	if (!found) {
        var obj = {
			name: element.getAttribute("name"),
			type: element.getAttribute("type"),
            pos: {
                x: Number(element.getAttribute("position-x")),
                y: Number(element.getAttribute("position-y"))
            }
		};
        if (element.getAttribute("type") == "class") {
            obj["properties"] = props;
            obj["functions"] = funcs;
        } else {
            obj["text"] = element.getAttribute("text");
        }
        obj_array.push(obj);
	}

	jsonEditor.setValue(JSON.stringify(json_obj, null, 4));

    draw();
}

customElements.define("class-element", ClassElement);

document.getElementById("addClass").addEventListener("click", () => {
    var classElement = new ClassElement();
    document.getElementById("editor").appendChild(classElement);
});

customElements.define("comment-element", CommentElement);

document.getElementById("addComment").addEventListener("click", () => {
    var commentElement = new CommentElement();
    document.getElementById("editor").appendChild(commentElement);
});

class LinkElement extends HTMLElement {
    constructor() {
        super();

        this.id = Math.random().toString(36).substring(2, 9);
        this.id = this.id;
        this.setAttribute("id", this.id);
    }

    connectedCallback() {
        var typeLabel = document.createElement("label");
        typeLabel.innerHTML = "Type";
        typeLabel.htmlFor = this.id + "-type";
        this.appendChild(typeLabel);

        this.setAttribute("type", "association");
        var typeField = document.createElement("select");
        typeField.id = this.id + "-type";
        typeField.addEventListener("change", () => {
            this.setAttribute("type", typeField.value);

            if (typeField.value == "other_pos") {
                this.setAttribute("from", "0;0");
                this.setAttribute("to", "0;0");
                
                document.getElementById(this.id + "-from").value = "0;0";
                document.getElementById(this.id + "-to").value = "0;0";
            }

            updateJsonLinks(this);
        });

        var option = document.createElement("option");
        option.value = "association";
        option.innerHTML = "Association / Asszociáció";
        typeField.appendChild(option);

        var option = document.createElement("option");
        option.value = "generalization";
        option.innerHTML = "Generalization / Általánosítás (Öröklés)";
        typeField.appendChild(option);

        var option = document.createElement("option");
        option.value = "composition";
        option.innerHTML = "Composition / Kompozíció";
        typeField.appendChild(option);

        var option = document.createElement("option");
        option.value = "aggregation";
        option.innerHTML = "Aggregation / Aggregáció";
        typeField.appendChild(option);

        var option = document.createElement("option");
        option.value = "other";
        option.innerHTML = "Other / Egyéb";
        typeField.appendChild(option);

        var option = document.createElement("option");
        option.value = "other_pos";
        option.innerHTML = "Other (Position) / Egyéb (Pozíció)";
        typeField.appendChild(option);

        this.appendChild(typeField);

        var fromLabel = document.createElement("label");
        fromLabel.innerHTML = "From";
        fromLabel.htmlFor = this.id + "-from";
        this.appendChild(fromLabel);

        this.setAttribute("from", "");
        var fromField = document.createElement("input");
        fromField.type = "text";
        fromField.value = "";
        fromField.id = this.id + "-from";
        fromField.addEventListener("keyup", () => {
            this.setAttribute("from", fromField.value);
            updateJsonLinks(this);
        });
        this.appendChild(fromField);

        var toLabel = document.createElement("label");
        toLabel.innerHTML = "To";
        toLabel.htmlFor = this.id + "-to";
        this.appendChild(toLabel);

        this.setAttribute("to", "");
        var toField = document.createElement("input");
        toField.type = "text";
        toField.value = "";
        toField.id = this.id + "-to";
        toField.addEventListener("keyup", () => {
            this.setAttribute("to", toField.value);
            updateJsonLinks(this);
        });
        this.appendChild(toField);

        var directionLabel = document.createElement("label");
        directionLabel.innerHTML = "Direction";
        directionLabel.htmlFor = this.id + "-direction";
        this.appendChild(directionLabel);

        this.setAttribute("direction", "omni");
        var directionField = document.createElement("select");
        directionField.id = this.id + "-direction";
        directionField.addEventListener("change", () => {
            this.setAttribute("direction", directionField.value);
            updateJsonLinks(this);
        });
        
        var option = document.createElement("option");
        option.value = "omni";
        option.innerHTML = "Omnidirectional / Kétirányú";
        directionField.appendChild(option);

        var option = document.createElement("option");
        option.value = "from";
        option.innerHTML = "From / Kiinduló";
        directionField.appendChild(option);

        var option = document.createElement("option");
        option.value = "to";
        option.innerHTML = "To / Cél";
        directionField.appendChild(option);

        this.appendChild(directionField);

        var commentLabel = document.createElement("label");
        commentLabel.innerHTML = "Comment";
        commentLabel.htmlFor = this.id + "-comment";
        this.appendChild(commentLabel);

        this.setAttribute("comment", "");
        var commentField = document.createElement("textarea");
        commentField.value = "";
        commentField.id = this.id + "-comment";
        commentField.addEventListener("change", () => {
            this.setAttribute("comment", commentField.value);
            updateJsonLinks(this);
        });
        this.appendChild(commentField);

        var helpText = document.createElement("p");
        helpText.innerHTML = "Az ez alatt lávő három beállítható dolog az Other kapcsolatokhoz van.";
        this.appendChild(helpText);

        var linetypeLabel = document.createElement("label");
        linetypeLabel.innerHTML = "Line Type";
        linetypeLabel.htmlFor = this.id + "-linetype";
        this.appendChild(linetypeLabel);

        this.setAttribute("linetype", "solid");
        var linetypeField = document.createElement("select");
        linetypeField.id = this.id + "-linetype";
        linetypeField.addEventListener("change", () => {
            this.setAttribute("linetype", linetypeField.value);
            updateJsonLinks(this);
        });

        var option = document.createElement("option");
        option.value = "solid";
        option.innerHTML = "Solid / Folytonos";
        linetypeField.appendChild(option);

        var option = document.createElement("option");
        option.value = "dashed";
        option.innerHTML = "Dashed / Szaggatott";
        linetypeField.appendChild(option);

        var option = document.createElement("option");
        option.value = "dotted";
        option.innerHTML = "Dotted / Pontozott";
        linetypeField.appendChild(option);

        this.appendChild(linetypeField);

        var arrowLabel = document.createElement("label");
        arrowLabel.innerHTML = "Arrow";
        arrowLabel.htmlFor = this.id + "-arrow";
        this.appendChild(arrowLabel);

        this.setAttribute("arrow", "none");
        var arrowField = document.createElement("select");
        arrowField.id = this.id + "-arrow";
        arrowField.addEventListener("change", () => {
            this.setAttribute("arrow", arrowField.value);
            updateJsonLinks(this);
        });

        var option = document.createElement("option");
        option.value = "none";
        option.innerHTML = "None / Nincs";
        arrowField.appendChild(option);

        var option = document.createElement("option");
        option.value = "line";
        option.innerHTML = "Line / Vonal";
        arrowField.appendChild(option);

        var option = document.createElement("option");
        option.value = "full";
        option.innerHTML = "Full / Teljes";
        arrowField.appendChild(option);
        
        var option = document.createElement("option");
        option.value = "diamond";
        option.innerHTML = "Diamond / Gyémánt";
        arrowField.appendChild(option);

        this.appendChild(arrowField);

        var arrowColorLabel = document.createElement("label");
        arrowColorLabel.innerHTML = "Arrow Color";
        arrowColorLabel.htmlFor = this.id + "-arrow-color";
        this.appendChild(arrowColorLabel);

        this.setAttribute("arrow_color", "#000000");
        var arrowColorField = document.createElement("input");
        arrowColorField.type = "color";
        arrowColorField.value = "#000000";
        arrowColorField.id = this.id + "-arrow-color";
        arrowColorField.addEventListener("change", () => {
            this.setAttribute("arrow_color", arrowColorField.value);
            updateJsonLinks(this);
        });
        this.appendChild(arrowColorField);

        updateJsonLinks(this);

        var updateButton = document.createElement("button");
        updateButton.innerHTML = "Update";
        updateButton.addEventListener("click", () => {
            updateJsonLinks(this);
        });
        this.appendChild(updateButton);

        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.addEventListener("click", () => {
            deleteLinkElement(this.id);
            this.remove();
        });
        this.appendChild(deleteButton);

        draw();
    }
}

function deleteLinkElement(id) {
    var json_obj = JSON.parse(jsonEditor.getValue());
    var link_array = json_obj["links"];

    for (var i = 0; i < link_array.length; i++) {
        if (link_array[i]["id"] == id) {
            link_array.splice(i, 1);
            break;
        }
    }

    jsonEditor.setValue(JSON.stringify(json_obj, null, 4));

    draw();
}

function updateJsonLinks(element) {
    var json_obj = JSON.parse(jsonEditor.getValue());
    var link_array = json_obj["links"];

    var found = false;
    for (var i = 0; i < link_array.length; i++) {
        if (link_array[i]["id"] == element.getAttribute("id")) {
            found = true;
            link_array[i]["type"] = element.getAttribute("type");
            if (element.getAttribute("type") == "other_pos") {
                var from = {
                    x: Number(element.getAttribute("from").split(";")[0]),
                    y: Number(element.getAttribute("from").split(";")[1])
                };
                var to = {
                    x: Number(element.getAttribute("to").split(";")[0]),
                    y: Number(element.getAttribute("to").split(";")[1])
                };
                link_array[i]["from"] = from;
                link_array[i]["to"] = to;
            } else {
                link_array[i]["from"] = element.getAttribute("from");
                link_array[i]["to"] = element.getAttribute("to");
            }
            link_array[i]["direction"] = element.getAttribute("direction");
            link_array[i]["comment"] = element.getAttribute("comment");
            link_array[i]["linetype"] = element.getAttribute("linetype");
            link_array[i]["arrow"] = element.getAttribute("arrow");
            link_array[i]["arrow_color"] = element.getAttribute("arrow_color");
            break;
        }
    }

    if (!found) {
        var link = {
            id: element.getAttribute("id"),
            type: element.getAttribute("type"),
            from: element.getAttribute("from"),
            to: element.getAttribute("to"),
            direction: element.getAttribute("direction"),
            comment: element.getAttribute("comment"),
            linetype: element.getAttribute("linetype"),
            arrow: element.getAttribute("arrow"),
            arrow_color: element.getAttribute("arrow_color")
        };
        link_array.push(link);
    }

    jsonEditor.setValue(JSON.stringify(json_obj, null, 4));

    draw();
}

customElements.define("link-element", LinkElement);

document.getElementById("addLink").addEventListener("click", () => {
    var linkElement = new LinkElement();
    document.getElementById("editor").appendChild(linkElement);
});