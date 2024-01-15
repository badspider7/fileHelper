const { execFile, exec, spawn } = require("child_process");

function sortFiles(files) {
	return files.sort((a, b) => {
		if (a.Directory === "文件夹" && b.Directory === "文件夹") {
			return a.folderName.localeCompare(b.folderName);
		} else if (a.Directory === "文件夹") {
			return -1;
		} else if (b.Directory === "文件夹") {
			return 1;
		} else {
			return a.folderName.localeCompare(b.folderName);
		}
	});
}

const data = [
	{ key: 0, folderName: "andex.html", remarks: "", size: "545.00B", category: "html", Directory: "文件" },
	{ key: 2, folderName: "blectron", remarks: "", size: "-", category: "folder", Directory: "文件夹" },
	{ key: 1, folderName: "cain.js", remarks: "", size: "2.28KB", category: "js", Directory: "文件" },
	{ key: 3, folderName: "drc", remarks: "", size: "-", category: "folder", Directory: "文件夹" },
	{ key: 4, folderName: "drc", remarks: "", size: "-", category: "folder", Directory: "文件" },
	{ key: 5, folderName: "frc", remarks: "", size: "-", category: "folder", Directory: "文件" },
	{ key: 6, folderName: "grc", remarks: "", size: "-", category: "folder", Directory: "文件夹" }
];

const s = sortFiles(data);
// console.log(s);

function testExecFile(filePath) {
	// const child = execFile("cmd.exe", ["/c", "start", filePath], (error, stdout, stderr) => {
	// 	if (error) {
	// 		throw error;
	// 	}
	// 	console.log(stdout);
	// });
	// child.stdout.on("data", (data) => {
	// 	console.log(`stdout: ${data}`);
	// });
	// child.stderr.on("data", (data) => {
	// 	console.error(`stderr: ${data}`);
	// });
	// child.on("close", (code) => {
	// 	console.log(`子进程退出，退出码 ${code}`);
	// });

	spawn("code", ["."]);

	// const exeRes = execFile(filePath);
	// console.log("exeRes", exeRes);
}

// testExecFile("D:\\Typora\\Typora.exe");

const child = exec("code D:\\comProject\\taizhou", (error, stdout, stderr) => {
	if (error) {
		throw error;
	}
	console.log(stdout);
});
child.stdout.on("data", (data) => {
	console.log(`stdout: ${data}`);
});
child.stderr.on("data", (data) => {
	console.error(`stderr: ${data}`);
});
child.on("close", (code) => {
	console.log(`子进程退出，退出码 ${code}`);
});
