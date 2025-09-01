let walls = [];

function addWall() {
  const name =
    document.getElementById("wallName").value || `Wall ${walls.length + 1}`;
  const length = parseFloat(document.getElementById("length").value);
  const height = parseFloat(document.getElementById("height").value);
  const openings = parseFloat(document.getElementById("openings").value) || 0;
  const blocksPerSqm = parseInt(document.getElementById("blockSize").value);

  if (!length || !height) {
    alert("Please enter valid length and height");
    return;
  }

  walls.push({ name, length, height, openings, blocksPerSqm });
  updateWallList();

  // reset form
  document.getElementById("wallName").value = "";
  document.getElementById("length").value = "";
  document.getElementById("height").value = "";
  document.getElementById("openings").value = "0";
  document.getElementById("blockSize").value = "13";
}

function updateWallList() {
  const list = document.getElementById("walls");
  list.innerHTML = "";
  walls.forEach((wall, index) => {
    const li = document.createElement("li");
    li.textContent = `${wall.name}: ${wall.length}m x ${wall.height}m, openings: ${wall.openings}m², block size: ${wall.blocksPerSqm} blocks/m²`;
    list.appendChild(li);
  });
}

function calculateBlocks() {
  let totalBlocks = 0;

  walls.forEach((wall) => {
    const area = wall.length * wall.height - wall.openings;
    const blocks = area * wall.blocksPerSqm;
    totalBlocks += blocks;
  });

  const wastage = Math.ceil(totalBlocks * 0.05); // 5% wastage rounded up
  const totalWithWastage = Math.ceil(totalBlocks + wastage);

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    Raw total blocks: ${Math.ceil(totalBlocks)} <br>
    5% wastage: ${wastage} <br>
    <strong>Total (incl. wastage): ${totalWithWastage}</strong>
  `;
}
