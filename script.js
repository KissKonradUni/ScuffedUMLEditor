const jsonElement = document.getElementById("json");
var json = JSON.parse(jsonEditor.getValue());

const canvas = document.getElementById("canvas");

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

const cW = document.getElementById("canvas-width");
const cH = document.getElementById("canvas-height");

var width = cW.value;
var height = cH.value;
canvas.width = width;
canvas.height = height;

cW.addEventListener("change", () => {
    width = cW.value;
    canvas.width = width;
    draw();
});
cH.addEventListener("change", () => {
    height = cH.value;
    canvas.height = height;
    draw();
});

const colorPicker = document.getElementById("color");
colorPicker.addEventListener("change", () => {
    color = colorPicker.value;
    draw();
});

var color = colorPicker.value;

var propCache = {};

document.getElementById("update").addEventListener("click", () => {
	json = JSON.parse(jsonEditor.getValue());
	draw(json);
});

function draw(file) {
    propCache = {};

    if (file == null) 
        file = JSON.parse(jsonEditor.getValue());

	ctx.fillStyle = "#00000000";
	ctx.fillRect(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);

	ctx.font = "20px Monospace";
	ctx.textBaseline = "top";

	file["objects"].forEach((element) => {
		if (element.type == "comment") {
			drawComment(element);
			return;
		}

		drawClass(element);
	});

	file["links"].forEach((connection) => {
		drawConnection(connection);
	});
}

function calcMinWidth(element) {
	var minWidth = 0;
	element["properties"].forEach((property_) => {
		var attr = ctx.measureText(property_.text);
		minWidth = Math.max(minWidth, attr.width);
	});
	element["functions"].forEach((function_) => {
		var func = ctx.measureText(function_.text);
		minWidth = Math.max(minWidth, func.width);
	});
	minWidth = Math.max(minWidth, ctx.measureText(element.name).width);
	return minWidth + 40;
}

function calcMinWidthComment(element) {
	var minWidth = 0;
	element["text"].split("\n").forEach((line) => {
		var attr = ctx.measureText(line);
		minWidth = Math.max(minWidth, attr.width);
	});
	return minWidth;
}

function createBasicTextObject(text) {
	return {
		text: text,
		align: "left",
		color: "black",
		x: 0,
		y: 0,
		width: ctx.measureText(text).width,
	};
}

function drawText(textObject, containerWidth) {
	ctx.fillStyle = textObject.color;
	ctx.textAlign = textObject.align;
    ctx.lineHeight = textObject.lineHeight ?? 20; 
	ctx.fillText(
		textObject.text,
		textObject.align == "center" ? textObject.x + containerWidth / 2 : textObject.x,
		textObject.y,
		textObject.width
	);
}

function drawComment(element) {
	var lines = element.text.split("\n");

	var text = [];
	lines.forEach((line, index) => {
		text.push(createBasicTextObject(line));
		text[index].x = element.pos.x + 24;
		text[index].y = element.pos.y + (index + 1) * 24;
	});

	var minWidth = calcMinWidthComment(element);

	var props = {
		x: element.pos.x,
		y: element.pos.y,
		width: Math.max(minWidth + 78, 200),
		height: lines.length * 24 + 48
	};
    props["heightSum"] = props.height;
	propCache[element.name] = props;

	drawShadowRect({
		x: props.x,
		y: props.y,
		width: props.width,
		height: props.height,
	});

	ctx.clearRect(props.x + props.width - 30, props.y - 5, 40, 35);
    ctx.fillStyle = "#00000088"
    ctx.beginPath();
	ctx.moveTo(props.x + props.width - 25, props.y);
	ctx.lineTo(props.x + props.width + 5, props.y + 30);
	ctx.lineTo(props.x + props.width - 25, props.y + 30);
	ctx.lineTo(props.x + props.width - 25, props.y);
	ctx.fill();
    ctx.clearRect(props.x + props.width - 30, props.y - 5, 40, 10);
    ctx.fillStyle = "White"
	ctx.beginPath();
	ctx.moveTo(props.x + props.width - 30, props.y);
	ctx.lineTo(props.x + props.width, props.y + 30);
	ctx.lineTo(props.x + props.width - 30, props.y + 30);
	ctx.lineTo(props.x + props.width - 30, props.y);
	ctx.fill();
	ctx.stroke();

	lines.forEach((line, index) => {
		drawText(text[index], 0);
	});
}

function drawClass(element) {
	var minWidth = calcMinWidth(element);

	var name = createBasicTextObject(element.name);
	name.x = element.pos.x;
	name.y = element.pos.y + 10;
	name.align = "center";

	var props = {
		x: element.pos.x,
		y: element.pos.y,
		width: Math.max(minWidth, 200),
		height: [40, element["properties"].length * 30, element["functions"].length * 30],
		heightSum: 0,
	};
	props.height.forEach((height) => {
		props.heightSum += height;
	});
	propCache[element.name] = props;

	drawShadowRect({
		x: props.x,
		y: props.y,
		width: props.width,
		height: props.heightSum,
	});

	ctx.font = "bold 20px Monospace";
	drawText(name, props.width);

	ctx.beginPath();
	ctx.moveTo(props.x, props.y + 40);
	ctx.lineTo(props.x + props.width, props.y + 40);
	ctx.stroke();

	ctx.font = "20px Monospace";
	element["properties"].forEach((attribute, index) => {
		var attr = createBasicTextObject(attribute.text);
		attr.x = props.x + 10;
		attr.y = props.y + 45 + index * 30;
		drawText(attr, props.width);
	});

	ctx.beginPath();
	ctx.moveTo(props.x, props.y + props.height[0] + props.height[1]);
	ctx.lineTo(props.x + props.width, props.y + props.height[0] + props.height[1]);
	ctx.stroke();

	element["functions"].forEach((function_, index) => {
		var func = createBasicTextObject(function_.text);
		func.x = props.x + 10;
		func.y = props.y + props.height[0] + props.height[1] + 5 + index * 30;
		drawText(func, props.width);
	});
}

function drawShadowRect(rect) {
	ctx.fillStyle = "#00000088";
	ctx.fillRect(rect.x + 5, rect.y + 5, rect.width, rect.height);
	ctx.fillStyle = color;
	ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
	ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
}

function drawConnection(element) {
    if ((element.from == element.to) ||
        (element.from == "") ||
        (element.to == "") ||
        (typeof propCache[element.from] == "undefined") ||
        (typeof propCache[element.to] == "undefined")) {
        return;
    }

    if (element.type == "other_pos") {
        drawArrow(element, element);
		return;
	}

	var start = propCache[element.from];
	var end = propCache[element.to];

	var fromToDirection = findDirection(start, end);

	switch (fromToDirection.name) {
		case "N":
			var intersection = {
				xStart: Math.max(start.x, end.x),
				xEnd: Math.min(start.x + start.width, end.x + end.width),
				y: start.y,
			};
			intersection["xMidpoint"] = (intersection.xStart + intersection.xEnd) / 2;

			var line = {
				xStart: intersection.xMidpoint,
				yStart: intersection.y,
				xEnd: intersection.xMidpoint,
				yEnd: end.y + end.heightSum,
			};
			drawArrow(line, element);

			break;
        case "NE":
            var corners = {
                xStart: start.x + start.width,
                yStart: start.y,
                xEnd: end.x,
                yEnd: end.y + end.heightSum,
            };
            drawArrow(corners, element);
            break;
        case "E":
            var intersection = {
                x: start.x + start.width,
                yStart: Math.max(start.y, end.y),
                yEnd: Math.min(start.y + start.heightSum, end.y + end.heightSum),
            };
            intersection["yMidpoint"] = (intersection.yStart + intersection.yEnd) / 2;

            var line = {
                xStart: intersection.x,
                yStart: intersection.yMidpoint,
                xEnd: end.x,
                yEnd: intersection.yMidpoint,
            };
            drawArrow(line, element);
            break;
        case "SE":
            var corners = {
                xStart: start.x + start.width,
                yStart: start.y + start.heightSum,
                xEnd: end.x,
                yEnd: end.y,
            };
            drawArrow(corners, element);
            break;
        case "S":
            var intersection = {
                xStart: Math.max(start.x, end.x),
                xEnd: Math.min(start.x + start.width, end.x + end.width),
                y: start.y + start.heightSum,
            };
            intersection["xMidpoint"] = (intersection.xStart + intersection.xEnd) / 2;

            var line = {
                xStart: intersection.xMidpoint,
                yStart: intersection.y,
                xEnd: intersection.xMidpoint,
                yEnd: end.y,
            };
            drawArrow(line, element);
            break;
        case "SW":
            var corners = {
                xStart: start.x,
                yStart: start.y + start.heightSum,
                xEnd: end.x + end.width,
                yEnd: end.y,
            };
            drawArrow(corners, element);
            break;
        case "W":
            var intersection = {
                xStart: start.x,
                xEnd: end.x + end.width,
                y: Math.max(start.y, end.y),
            };
            intersection["yMidpoint"] = (intersection.yStart + intersection.yEnd) / 2;

            var line = {
                xStart: intersection.xStart,
                yStart: intersection.yMidpoint,
                xEnd: intersection.xEnd,
                yEnd: intersection.yMidpoint,
            };
            drawArrow(line, element);
            break;
        case "NW":
            var corners = {
                xStart: start.x,
                yStart: start.y,
                xEnd: end.x + end.width,
                yEnd: end.y + end.heightSum,
            };
            drawArrow(corners, element);
            break;
	}
}

/**
 * Returns the 8 possible directions from start to end
 * N, NE, E, SE, S, SW, W, NW
 * @param {object} start
 * @param {object} end
 */
function findDirection(start, end) {
	var directions = [
		{ x: 0, y: 1, name: "N" },
		{ x: -1, y: 1, name: "NE" },
		{ x: -1, y: 0, name: "E" },
		{ x: -1, y: -1, name: "SE" },
		{ x: 0, y: -1, name: "S" },
		{ x: 1, y: -1, name: "SW" },
		{ x: 1, y: 0, name: "W" },
		{ x: 1, y: 1, name: "NW" },
	];

	var direction = { x: 0, y: 0 };
	var minDistance = 1000000;
	directions.forEach((dir) => {
		var distance = Math.sqrt(Math.pow(end.x - start.x + dir.x, 2) + Math.pow(end.y - start.y + dir.y, 2));
		if (distance < minDistance) {
			minDistance = distance;
			direction = dir;
		}
	});

	return direction;
}

function drawArrow(line, element) {
	switch (element.type) {
		case "association":
			drawAssociation(line, element);
			break;
        case "generalization":
            drawGeneralization(line, element);
            break;
        case "composition":
            drawLine(line);
            drawArrowHead(line, "diamond", element.direction, "black");
            break;        
        case "aggregation":
            drawLine(line);
            drawArrowHead(line, "diamond", element.direction, "white");
            break;
        case "other":
            drawLine(line, element.linetype);
            drawArrowHead(line, element.arrow, element.direction, element.arrow_color);
            break;
        case "other_pos":
            var posLine = {
                xStart: element.from.x,
                yStart: element.from.y,
                xEnd: element.to.x,
                yEnd: element.to.y
            };    
            drawLine(posLine, element.linetype);
            drawArrowHead(posLine, element.arrow, element.direction, element.arrow_color);
            break;
        default:
            drawLine(line);
            break;
    }
}

function drawLine(line, linetype = "line") {
	// set dash style
    switch (linetype) {
        case "dashed":
            ctx.setLineDash([5, 5]);
            break;
        case "dotted":
            ctx.setLineDash([2, 2]);
            break;
        default:
            ctx.setLineDash([]);
            break;
    }

    ctx.beginPath();
	ctx.moveTo(line.xStart, line.yStart);
	ctx.lineTo(line.xEnd, line.yEnd);
	ctx.stroke();

    ctx.setLineDash([]);
}

function drawTextBackground(text) {
	ctx.beginPath();
	ctx.fillStyle = "#ffffffcc";
	ctx.strokeStyle = "#00000044";
	ctx.roundRect(text.align == "center" ? text.x - text.width / 2 - 4 : text.x - 4, text.y - 4, text.width + 8, 28, 10);
	ctx.fill();
	ctx.stroke();

	ctx.strokeStyle = "#000000";
}

function drawAssociation(line, element) {
	drawLine(line);

	if (typeof element.comment != "undefined") {
		var associationName = createBasicTextObject(element.comment);
		associationName.x = (line.xStart + line.xEnd) / 2;
		associationName.y = (line.yStart + line.yEnd) / 2;
		associationName.align = "center";

		drawTextBackground(associationName);
		drawText(associationName, 0);
		drawArrowHead(line, "line", element.direction);
	}
}

function drawGeneralization(line, element) {
    drawLine(line);
    drawArrowHead(line, "full", element.direction);
}

function calculatePerpendicular(line, amount) {
	var perpendicular = {
		x: line.yEnd - line.yStart,
		y: line.xStart - line.xEnd,
	};
	var length = Math.sqrt(Math.pow(perpendicular.x, 2) + Math.pow(perpendicular.y, 2));
	perpendicular.x /= length;
	perpendicular.y /= length;
	perpendicular.x *= amount;
	perpendicular.y *= amount;

	return perpendicular;
}

function calculateInVectorDirection(line, amount) {
    var inVector = {
        x: line.xEnd - line.xStart,
        y: line.yEnd - line.yStart,
    };
    var length = Math.sqrt(Math.pow(inVector.x, 2) + Math.pow(inVector.y, 2));
    inVector.x /= length;
    inVector.y /= length;
    inVector.x *= amount;
    inVector.y *= amount;

    return inVector;
}

function drawArrowHead(line, type, direction, arrowColor = "white") {
	var arrow = {};
	switch (direction) {
		case "to":
			arrow = {
				x: line.xEnd,
				y: line.yEnd,
				angle: Math.atan2(line.yStart - line.yEnd, line.xStart - line.xEnd) + Math.PI,
			};
			break;
		case "from":
			arrow = {
				x: line.xStart,
				y: line.yStart,
				angle: Math.atan2(line.yEnd - line.yStart, line.xEnd - line.xStart) + Math.PI,
			};
			break;
	}

	ctx.strokeStyle = "black";

    ctx.fillStyle = arrowColor;
	switch (type) {
		case "line":
			ctx.beginPath();
			ctx.moveTo(arrow.x, arrow.y);
			ctx.lineTo(
				arrow.x - 30 * Math.cos(arrow.angle - Math.PI / 6),
				arrow.y - 30 * Math.sin(arrow.angle - Math.PI / 6)
			);
			ctx.moveTo(arrow.x, arrow.y);
			ctx.lineTo(
				arrow.x - 30 * Math.cos(arrow.angle + Math.PI / 6),
				arrow.y - 30 * Math.sin(arrow.angle + Math.PI / 6)
			);
			ctx.stroke();
			break;
        case "full":
            ctx.beginPath();
            ctx.moveTo(arrow.x, arrow.y);
            ctx.lineTo(
                arrow.x - 30 * Math.cos(arrow.angle - Math.PI / 6),
                arrow.y - 30 * Math.sin(arrow.angle - Math.PI / 6)
            );
            ctx.lineTo(
                arrow.x - 30 * Math.cos(arrow.angle + Math.PI / 6),
                arrow.y - 30 * Math.sin(arrow.angle + Math.PI / 6)
            );
            ctx.lineTo(arrow.x, arrow.y);
            ctx.fill();
            ctx.stroke();
            break;
        case "diamond":
            ctx.beginPath();
            ctx.moveTo(arrow.x, arrow.y);
            ctx.lineTo(
                arrow.x - 30 * Math.cos(arrow.angle - Math.PI / 6),
                arrow.y - 30 * Math.sin(arrow.angle - Math.PI / 6)
            );
            var inVector = calculateInVectorDirection(line, 60);
            ctx.lineTo(
                arrow.x + inVector.x,
                arrow.y + inVector.y
            );
            ctx.lineTo(
                arrow.x - 30 * Math.cos(arrow.angle + Math.PI / 6),
                arrow.y - 30 * Math.sin(arrow.angle + Math.PI / 6)
            );
            ctx.lineTo(arrow.x, arrow.y);
            ctx.fill();
            ctx.stroke();
            break;
	}
}

draw(json);