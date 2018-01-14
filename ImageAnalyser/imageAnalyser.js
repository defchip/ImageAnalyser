
<style>
    #preview img {
        height: 150px;
    }
    table, th, td {
        border: none;
        background-color: #cccccc;
    }
    th, td {
        padding: 0px;
        text-align: center;
    }
</style>

<input id="browse" style="display: none;" type="file">
<label for="browse" class="et_pb_button">Select Image</label>
<br>
<br>

<div>
    <div id="previewLabel" class="infoField" style="font-weight: bold;"></div>
    <br>
    <div id="preview" class="infoField"></div>
    <br>
</div>

<div>
    <div id="result" class="infoField" style="font-weight: bold;"></div>
    <br>
</div>

<div>
    <table id="resultsTable"></table>
</div>

<div id="infoPanel">
    <br>
    <div id="imageName" class="infoField"></div>
    <br>
    <div id="imageRes" class="infoField"></div>
    <br>
    <div id="imageType" class="infoField"></div>
    <br>
    <div id="imageSize" class="infoField"></div>
    <br>
    <div id="imageRatio" class="infoField"></div>
    <br>
</div>
<br>

<script>
    function tableCreate(array) {
        var tbl = document.getElementById('resultsTable');

        var upperPPI = 150;
        var lowerPPI = 72;

        var tr = tbl.insertRow();
        tr.style.height = "50px";

        var td = tr.insertCell();
        td.style.fontWeight = "bold";
        td.appendChild(document.createTextNode("Canvas Size (inches)"));

        var td = tr.insertCell();
        td.style.fontWeight = "bold";
        td.appendChild(document.createTextNode("Image Quality"));

        var td = tr.insertCell();
        td.style.fontWeight = "bold";
        td.appendChild(document.createTextNode("Canvas Price"));

        for (var i = 0; i < array.length; i++) {
            var tr = tbl.insertRow();

            //populate canvas size
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(array[i].sizeHeight + ' x ' + array[i].sizeWidth));

            //populate image quality
            var td = tr.insertCell();
            td.appendChild(document.createTextNode(array[i].ppi + 'ppi'));
            if (array[i].ppi > upperPPI) {
                td.style.color = 'white';
                td.style.backgroundColor = 'green';
            } else if (array[i].ppi < lowerPPI) {
                td.style.color = 'white';
                td.style.backgroundColor = 'red';
            } else {
                td.style.color = 'black';
                td.style.backgroundColor = 'orange';
            }

            //populate prices
            var td = tr.insertCell();
            td.appendChild(document.createTextNode("£" + array[i].price));

            //populate links
            var td = tr.insertCell();
            var message = array[i].urlExt;
            var span = document.createElement('span');
            span.innerHTML = '<button class="et_pb_button" onclick="openLink(\'' + message + '\')">Order</button>';
            td.appendChild(span);
        }
    }
</script>

<script>
    function openLink(stub) {
        var link = 'https://that-canvas-shop.co.uk/product/custom-canvas/?attribute_pa_custom-canvas-sizes=' + stub;
        window.open(link, "_blank");
    }
</script>


<script>
    window.URL = window.URL || window.webkitURL;
    var elBrowse = document.getElementById("browse");
    var elPreview = document.getElementById("preview");
    var useBlob = false && window.URL;

    function readImage(file) {
        var ele = document.getElementsByClassName("infoField");
        for (var i = 0; i < ele.length; i++) {
            ele[i].innerHTML = '';
        }

        var tbl = document.getElementById('resultsTable');
        tbl.innerHTML = "";

        var reader = new FileReader();

        reader.addEventListener("load", function () {
            var image = new Image();

            image.addEventListener("load", function () {

                var imageWidth = image.width;
                var imageHeight = image.height;

                var maxPixel;

                if (imageWidth > imageHeight || imageWidth == imageHeight) {
                    maxPixel = imageWidth;
                } else {
                    maxPixel = imageHeight;
                }

                //define Size class
                class Size {

                    constructor(sizeHeight, sizeWidth, sizeOrientation, urlExt, price, ppi) {
                        this.sizeHeight = sizeHeight;
                        this.sizeWidth = sizeWidth;
                        this.sizeOrientation = sizeOrientation;
                        this.urlExt = urlExt;
                        this.price = price;
                        this.ppi = null;
                    }

                    //Ratio
                    get sizeRatio() {
                        return this.calcRatio();
                    }
                    calcRatio() {
                        var calcR;
                        switch (this.sizeOrientation) {
                            case 0:
                                calcR = 1;
                                break;
                            case 1:
                                calcR = this.sizeWidth / this.sizeHeight;
                                break;
                        }
                        return calcR.toFixed(1);
                    }
                }

                var sizesArray = [];

                //add Sizes
                sizesArray[0] = new Size(12, 12, 0, '12x12', 19);
                sizesArray[1] = new Size(12, 16, 1, '12x16', 25);
                sizesArray[2] = new Size(12, 20, 1, '12x20', 35);
                sizesArray[3] = new Size(12, 24, 1, '12x24', 39);
                sizesArray[4] = new Size(12, 30, 1, '12x30', 45);
                sizesArray[5] = new Size(12, 32, 1, '12x32', 49);
                sizesArray[6] = new Size(12, 40, 1, '12x40', 55);
                sizesArray[7] = new Size(16, 16, 0, '16x16', 29);
                sizesArray[8] = new Size(16, 20, 1, '16x20', 29);
                sizesArray[9] = new Size(16, 24, 1, '16x24', 40);
                sizesArray[10] = new Size(16, 30, 1, '16x30', 49);
                sizesArray[11] = new Size(16, 32, 1, '16x32', 50);
                sizesArray[12] = new Size(16, 40, 1, '16x40', 59);
                sizesArray[13] = new Size(20, 20, 0, '20x20', 35);
                sizesArray[14] = new Size(20, 24, 1, '20x24', 45);
                sizesArray[15] = new Size(20, 30, 1, '20x30', 49);
                sizesArray[16] = new Size(20, 32, 1, '20x32', 55);
                sizesArray[17] = new Size(20, 40, 1, '20x40', 65);
                sizesArray[18] = new Size(24, 24, 0, '24x24', 49);
                sizesArray[19] = new Size(24, 30, 1, '24x30', 55);
                sizesArray[20] = new Size(24, 32, 1, '24x32', 59);
                sizesArray[21] = new Size(24, 40, 1, '24x40', 69);
                sizesArray[22] = new Size(30, 30, 0, '30x30', 59);
                sizesArray[23] = new Size(30, 32, 1, '30x32', 65);
                sizesArray[24] = new Size(30, 40, 1, '30x40', 69);
                sizesArray[25] = new Size(32, 32, 0, '32x32', 70);
                sizesArray[26] = new Size(32, 40, 0, '32x40', 75);
                sizesArray[27] = new Size(40, 40, 0, '40x40', 79);

                var landscapeRatio = (imageWidth / imageHeight).toFixed(1);
                var portraitRatio = (imageHeight / imageWidth).toFixed(1);

                var orientation, orientationId, ratio, ratioDecimal;

                if (landscapeRatio == 1 || portraitRatio == 1) {
                    orientation = 0;
                    ratioDecimal = 1;
                    ratio = "1:1";
                } else if (imageWidth > imageHeight) {
                    orientation = 1;
                    ratio = "1:" + landscapeRatio;
                    ratioDecimal = landscapeRatio;
                } else {
                    orientation = 1;
                    ratio = "1:" + portraitRatio;
                    ratioDecimal = portraitRatio;
                }

                var selectedSizes = [];

                for (var i = 0; i < sizesArray.length; i++) {
                    if (sizesArray[i].sizeOrientation == orientation) {
                        if (sizesArray[i].sizeRatio == ratioDecimal) {
                            var ppi;
                            ppi = Math.round(maxPixel / sizesArray[i].sizeWidth);
                            sizesArray[i].ppi = ppi;
                            selectedSizes.push(sizesArray[i]);
                        }
                    }
                }

                var referralText = "<span>Unfortunately, we don't have any canvases which exactly match your image's proportions available to purchase online at the moment. You can proceed to our <a href='https://that-canvas-shop.co.uk/product/custom-canvas/'>shop</a> to manually select a size or, if you would like to contact us directly to confirm your required size, we can build your custom canvas to order. Thank you.</span>";
                var resultText = "The following canvas sizes fit your image's proportions and are available to purchase online now.";

                if (selectedSizes.length == 0) {
                    document.getElementById("result").innerHTML = referralText;
               } else {
                    tableCreate(selectedSizes);
                    document.getElementById("result").innerHTML = resultText;
                }

                elPreview.appendChild(this);

                document.getElementById("previewLabel").innerHTML = "Preview Thumbnail";
                document.getElementById("imageName").innerHTML = "Image Name: " + file.name;
                document.getElementById("imageRes").innerHTML = "Resolution: " + imageWidth + " x " + imageHeight;
                document.getElementById("imageType").innerHTML = "Type: " + file.type;
                document.getElementById("imageSize").innerHTML = "Size: " + Math.round(file.size / 1024) + "KB";
                document.getElementById("imageRatio").innerHTML = "Aspect Ratio: " + ratio;

                if (useBlob) {
                    // Free some memory
                    window.URL.revokeObjectURL(image.src);
                }
            });
            image.src = useBlob ? window.URL.createObjectURL(file) : reader.result;
        });

        reader.readAsDataURL(file);
    }

    elBrowse.addEventListener("change", function () {

        var files = this.files, errors = "";

        if (!files) {
            errors += "File upload not supported by your browser.";
        }

        if (files && files[0]) {

            for (var i = 0; i < files.length; i++) {
                var file = files[i];

                if ((/\.(png|jpeg|jpg|gif)$/i).test(file.name)) {
                    readImage(file);
                } else {
                    errors += file.name + " Unsupported Image extension\n";
                }

            }
        }

        // Handle errors
        if (errors) {
            alert(errors);
        }

    });
</script>
