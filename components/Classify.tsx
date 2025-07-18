"use client";

import React, { useState } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

interface Meteorite {
    id: number;
    ni: number;
    co: number;
    ga: number;
    ge: number;
    structure: string;
}

const structureVals = {
    "IIIAB": ["Om"],
    "IIC": ["Opl"],
    "IID": ["Om", "Of"],
    "IIF": ["Opl", "D"],
    "IVB": ["D"],
    "SBT": ["D"],
    "IIIF": ["Og", "Om"],
    "IC": ["Ogg", "Og"],
    "IIAB": ["H", "Ogg"],
    "IIIE": ["Og"],
    "IVA": ["Of"]
}

const minVals =
{
    "IIIAB": {
        "ga": 15.6,
        "ge": 27.3,
        "ni": 71.7,
        "co": 4.88
    },
    "IIC": {
        "ga": 36.5,
        "ge": 88.0,
        "ni": 92.7,
        "co": 5.43
    },
    "IID": {
        "ga": 71.2,
        "ge": 76.0,
        "ni": 96.0,
        "co": 6.6
    },
    "IIF": {
        "ga": 8.25,
        "ge": 97.4,
        "ni": 105.4,
        "co": 6.02
    },
    "IVB": {
        "ga": 0.17,
        "ge": 0.031,
        "ni": 156.8,
        "co": 7.54
    },
    "SBT": {
        "ga": 17.5,
        "ge": 45.0,
        "ni": 176.7,
        "co": 9.14
    },
    "IIIF": {
        "ga": 6.31,
        "ge": 0.701,
        "ni": 69.3,
        "co": 3.1
    },
    "IC": {
        "ga": 41.9,
        "ge": 85.4,
        "ni": 58.9,
        "co": 4.46
    },
    "IIAB": {
        "ga": 45.7,
        "ge": 106.0,
        "ni": 52.1,
        "co": 4.43
    },
    "IIIE": {
        "ga": 15.4,
        "ge": 25.7,
        "ni": 75.6,
        "co": 4.67
    },
    "IVA": {
        "ga": 1.6,
        "ge": 0.09,
        "ni": 73.2,
        "co": 3.8
    }
};

const maxVals =
{
    "IIIAB": {
        "ga": 22.7,
        "ge": 51.0,
        "ni": 103.0,
        "co": 5.68
    },
    "IIC": {
        "ga": 38.2,
        "ge": 114.0,
        "ni": 102.7,
        "co": 5.58
    },
    "IID": {
        "ga": 85.6,
        "ge": 99.1,
        "ni": 111.4,
        "co": 7.01
    },
    "IIF": {
        "ga": 11.0,
        "ge": 193.0,
        "ni": 134.9,
        "co": 6.92
    },
    "IVB": {
        "ga": 0.272,
        "ge": 0.071,
        "ni": 179.9,
        "co": 7.96
    },
    "SBT": {
        "ga": 19.7,
        "ge": 51.2,
        "ni": 178.1,
        "co": 9.64
    },
    "IIIF": {
        "ga": 7.05,
        "ge": 1.13,
        "ni": 87.3,
        "co": 4.86
    },
    "IC": {
        "ga": 57.0,
        "ge": 246.0,
        "ni": 70.5,
        "co": 4.97
    },
    "IIAB": {
        "ga": 92.5,
        "ge": 428.0,
        "ni": 67.9,
        "co": 5.26
    },
    "IIIE": {
        "ga": 18.6,
        "ge": 39.7,
        "ni": 88.6,
        "co": 5.0
    },
    "IVA": {
        "ga": 2.5,
        "ge": 0.14,
        "ni": 118,
        "co": 4.4
    }
};

function runAllFourTests(gaVal: number, geVal: number, niVal: number, coVal: number) {
    var testResults = { "IIIAB": 0, "IIC": 0, "IID": 0, "IIF": 0, "IVB": 0, "SBT": 0, "IIIF": 0, "IC": 0, "IIAB": 0, "IIIE": 0, "IVA": 0 };
    let testsPassed = 0;
    if (gaVal >= minVals.IIIAB.ga && gaVal <= maxVals.IIIAB.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIIAB.ge && geVal <= maxVals.IIIAB.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIIAB.ni && niVal <= maxVals.IIIAB.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIIAB.co && coVal <= maxVals.IIIAB.co) {
        testsPassed++;
    }
    testResults["IIIAB"] = testsPassed;
    testsPassed = 0;
    if (gaVal >= minVals.IIC.ga && gaVal <= maxVals.IIC.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIC.ge && geVal <= maxVals.IIC.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIC.ni && niVal <= maxVals.IIC.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIC.co && coVal <= maxVals.IIC.co) {
        testsPassed++;
    }
    testResults["IIC"] = testsPassed;
    testsPassed = 0;
    if (gaVal >= minVals.IID.ga && gaVal <= maxVals.IID.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IID.ge && geVal <= maxVals.IID.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IID.ni && niVal <= maxVals.IID.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IID.co && coVal <= maxVals.IID.co) {
        testsPassed++;
    }
    testResults["IID"] = testsPassed;
    testsPassed = 0;
    if (gaVal >= minVals.IIF.ga && gaVal <= maxVals.IIF.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIF.ge && geVal <= maxVals.IIF.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIF.ni && niVal <= maxVals.IIF.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIF.co && coVal <= maxVals.IIF.co) {
        testsPassed++;
    }
    testResults["IIF"] = testsPassed;
    testsPassed = 0;
    if (gaVal >= minVals.IVB.ga && gaVal <= maxVals.IVB.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IVB.ge && geVal <= maxVals.IVB.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IVB.ni && niVal <= maxVals.IVB.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IVB.co && coVal <= maxVals.IVB.co) {
        testsPassed++;
    }
    testResults["IVB"] = testsPassed;
    testsPassed = 0;
    if (gaVal >= minVals.SBT.ga && gaVal <= maxVals.SBT.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.SBT.ge && geVal <= maxVals.SBT.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.SBT.ni && niVal <= maxVals.SBT.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.SBT.co && coVal <= maxVals.SBT.co) {
        testsPassed++;
    }
    testResults["SBT"] = testsPassed;
    testsPassed = 0;
    if (gaVal >= minVals.IIIF.ga && gaVal <= maxVals.IIIF.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIIF.ge && geVal <= maxVals.IIIF.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIIF.ni && niVal <= maxVals.IIIF.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIIF.co && coVal <= maxVals.IIIF.co) {
        testsPassed++;
    }
    testResults["IIIF"] = testsPassed;
    testsPassed = 0;
    if (gaVal >= minVals.IC.ga && gaVal <= maxVals.IC.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IC.ge && geVal <= maxVals.IC.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IC.ni && niVal <= maxVals.IC.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IC.co && coVal <= maxVals.IC.co) {
        testsPassed++;
    }
    testResults["IC"] = testsPassed;
    testsPassed = 0;
    if (gaVal >= minVals.IIAB.ga && gaVal <= maxVals.IIAB.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIAB.ge && geVal <= maxVals.IIAB.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIAB.ni && niVal <= maxVals.IIAB.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIAB.co && coVal <= maxVals.IIAB.co) {
        testsPassed++;
    }
    testResults["IIAB"] = testsPassed;
    testsPassed = 0;
    if (gaVal >= minVals.IIIE.ga && gaVal <= maxVals.IIIE.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIIE.ge && geVal <= maxVals.IIIE.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIIE.ni && niVal <= maxVals.IIIE.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIIE.co && coVal <= maxVals.IIIE.co) {
        testsPassed++;
    }
    testResults["IIIE"] = testsPassed;
    testsPassed = 0;
    if (gaVal >= minVals.IVA.ga && gaVal <= maxVals.IVA.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IVA.ge && geVal <= maxVals.IVA.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IVA.ni && niVal <= maxVals.IVA.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IVA.co && coVal <= maxVals.IVA.co) {
        testsPassed++;
    }
    testResults["IVA"] = testsPassed;
    return testResults;
}

function runAllFiveTests(gaVal: number, geVal: number, niVal: number, coVal: number, structureVal: string) {
    var testResults = { "IIIAB": 0, "IIC": 0, "IID": 0, "IIF": 0, "IVB": 0, "SBT": 0, "IIIF": 0, "IC": 0, "IIAB": 0, "IIIE": 0, "IVA": 0 };
    let testsPassed = 0;
    if (gaVal >= minVals.IIIAB.ga && gaVal <= maxVals.IIIAB.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIIAB.ge && geVal <= maxVals.IIIAB.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIIAB.ni && niVal <= maxVals.IIIAB.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIIAB.co && coVal <= maxVals.IIIAB.co) {
        testsPassed++;
    }
    testResults["IIIAB"] = testsPassed + Number(structureVals["IIIAB"].includes(structureVal));
    testsPassed = 0;
    if (gaVal >= minVals.IIC.ga && gaVal <= maxVals.IIC.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIC.ge && geVal <= maxVals.IIC.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIC.ni && niVal <= maxVals.IIC.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIC.co && coVal <= maxVals.IIC.co) {
        testsPassed++;
    }
    testResults["IIC"] = testsPassed + Number(structureVals["IIC"].includes(structureVal));;
    testsPassed = 0;
    if (gaVal >= minVals.IID.ga && gaVal <= maxVals.IID.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IID.ge && geVal <= maxVals.IID.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IID.ni && niVal <= maxVals.IID.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IID.co && coVal <= maxVals.IID.co) {
        testsPassed++;
    }
    testResults["IID"] = testsPassed + Number(structureVals["IID"].includes(structureVal));;
    testsPassed = 0;
    if (gaVal >= minVals.IIF.ga && gaVal <= maxVals.IIF.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIF.ge && geVal <= maxVals.IIF.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIF.ni && niVal <= maxVals.IIF.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIF.co && coVal <= maxVals.IIF.co) {
        testsPassed++;
    }
    testResults["IIF"] = testsPassed + Number(structureVals["IIF"].includes(structureVal));;
    testsPassed = 0;
    if (gaVal >= minVals.IVB.ga && gaVal <= maxVals.IVB.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IVB.ge && geVal <= maxVals.IVB.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IVB.ni && niVal <= maxVals.IVB.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IVB.co && coVal <= maxVals.IVB.co) {
        testsPassed++;
    }
    testResults["IVB"] = testsPassed + Number(structureVals["IVB"].includes(structureVal));;
    testsPassed = 0;
    if (gaVal >= minVals.SBT.ga && gaVal <= maxVals.SBT.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.SBT.ge && geVal <= maxVals.SBT.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.SBT.ni && niVal <= maxVals.SBT.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.SBT.co && coVal <= maxVals.SBT.co) {
        testsPassed++;
    }
    testResults["SBT"] = testsPassed + Number(structureVals["SBT"].includes(structureVal));;
    testsPassed = 0;
    if (gaVal >= minVals.IIIF.ga && gaVal <= maxVals.IIIF.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIIF.ge && geVal <= maxVals.IIIF.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIIF.ni && niVal <= maxVals.IIIF.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIIF.co && coVal <= maxVals.IIIF.co) {
        testsPassed++;
    }
    testResults["IIIF"] = testsPassed + Number(structureVals["IIIF"].includes(structureVal));;
    testsPassed = 0;
    if (gaVal >= minVals.IC.ga && gaVal <= maxVals.IC.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IC.ge && geVal <= maxVals.IC.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IC.ni && niVal <= maxVals.IC.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IC.co && coVal <= maxVals.IC.co) {
        testsPassed++;
    }
    testResults["IC"] = testsPassed + Number(structureVals["IC"].includes(structureVal));;
    testsPassed = 0;
    if (gaVal >= minVals.IIAB.ga && gaVal <= maxVals.IIAB.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIAB.ge && geVal <= maxVals.IIAB.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIAB.ni && niVal <= maxVals.IIAB.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIAB.co && coVal <= maxVals.IIAB.co) {
        testsPassed++;
    }
    testResults["IIAB"] = testsPassed + Number(structureVals["IIAB"].includes(structureVal));;
    testsPassed = 0;
    if (gaVal >= minVals.IIIE.ga && gaVal <= maxVals.IIIE.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IIIE.ge && geVal <= maxVals.IIIE.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IIIE.ni && niVal <= maxVals.IIIE.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IIIE.co && coVal <= maxVals.IIIE.co) {
        testsPassed++;
    }
    testResults["IIIE"] = testsPassed + Number(structureVals["IIIE"].includes(structureVal));;
    testsPassed = 0;
    if (gaVal >= minVals.IVA.ga && gaVal <= maxVals.IVA.ga) {
        testsPassed++;
    }
    if (geVal >= minVals.IVA.ge && geVal <= maxVals.IVA.ge) {
        testsPassed++;
    }
    if (niVal >= minVals.IVA.ni && niVal <= maxVals.IVA.ni) {
        testsPassed++;
    }
    if (coVal >= minVals.IVA.co && coVal <= maxVals.IVA.co) {
        testsPassed++;
    }
    testResults["IVA"] = testsPassed + Number(structureVals["IVA"].includes(structureVal));;
    return testResults;
}

const Classify: React.FC = () => {
    const [rows, setRows] = useState<Meteorite[]>([{ id: 0, ni: 165.3, co: 7.46, ga: 0.192, ge: 0.050, structure: "" }]);
    const [results, setResults] = useState<String[]>([]);
    const handleChange = (id: number, field: string, value: number | string) => {
        setRows(prevRows =>
            prevRows.map(row => (row.id === id ? { ...row, [field]: value } : row))
        );
    };

    const handleAddRow = () => {
        const nextId = rows.length;
        setRows(prevRows => [...prevRows, { id: nextId, ni: 0, co: 0, ga: 0, ge: 0, structure: "" }]);
    };

    const handleClassify = () => {
        let resultDisplay = "";
        let nextResults: String[] = [];
        for (let i = 0; i < rows.length; i++) {
            let finalResultArr = [];
            let finalResult = "";
            if (rows[i].structure) {
                const allTests = runAllFiveTests(rows[i].ga, rows[i].ge, rows[i].ni, rows[i].co, rows[i].structure);
                console.log(allTests);
                if (Object.values(allTests).includes(5)) {
                    for (var k in allTests) {
                        if (allTests[k as keyof object] == 5) finalResultArr.push(k);
                    }
                    finalResult = finalResultArr.join(', ');
                } else {
                    finalResult = "Ungrouped";
                }
                nextResults.push(finalResult);
            } else {
                const allTests = runAllFourTests(rows[i].ga, rows[i].ge, rows[i].ni, rows[i].co);
                console.log(allTests);
                if (Object.values(allTests).includes(4)) {
                    for (var k in allTests) {
                        if (allTests[k as keyof object] == 4) finalResultArr.push(k);
                    }
                    finalResult = finalResultArr.join(', ');
                } else {
                    finalResult = "Ungrouped";
                }
                nextResults.push(finalResult);
            }
        }
        setResults(nextResults);

    };
    
    const classifyHelper = results.length === 0 ? (
        <div>
            <Typography className='text-lg mb-4'>
                To classify, input the measurement of each element of each sample for each row, then click &quot;Classify&quot;.
                For multiple samples, you can add rows by clicking &quot;Add row&quot;.
                The structural class is optional, but will be considered if inputted.
            </Typography>
            <Typography className='text-lg mb-4'>
                The best classification for each row will appear, labeled by row number.
                If our algorithm does not find a classification given the provided values, the sample will be considered ungrouped.
            </Typography>
            <Typography className='text-lg mb-4'>
                The values for the meteorite Hoba have been provided as an example.
            </Typography>
        </div>
    ) : (
        results.map((result, index) => (
            <Typography key={index} className='text-xl'>
                Row {index + 1}: {result}
            </Typography>
        ))
    );

    return (
        <div className="grid grid-cols-2 gap-3">
            <div className='content-center'>

                <Box component="main" sx={{ p: 3 }}>
                    <Toolbar />

                    <Grid container spacing={2}>

                        {rows.map(row => (
                            <Grid key={row.id} container item spacing={2} alignItems="center">
                                <Grid item className='w-1/5'>
                                    <TextField
                                        type="number"
                                        label="Nickel (mg/g)"
                                        value={row.ni}
                                        onChange={e => handleChange(row.id, "ni", e.target.value)}
                                    />
                                </Grid>
                                <Grid item className='w-1/5'>
                                    <TextField
                                        type="number"
                                        label="Cobalt (mg/g)"
                                        value={row.co}
                                        onChange={e => handleChange(row.id, "co", e.target.value)}
                                    />
                                </Grid>
                                <Grid item className='w-1/5'>
                                    <TextField
                                        type="number"
                                        label="Gallium (μg/g)"
                                        value={row.ga}
                                        onChange={e => handleChange(row.id, "ga", e.target.value)}
                                    />
                                </Grid>
                                <Grid item className='w-1/5'>
                                    <TextField
                                        type="number"
                                        label="Germanium (μg/g)"
                                        value={row.ge}
                                        onChange={e => handleChange(row.id, "ge", e.target.value)}
                                    />
                                </Grid>
                                <Grid item className='w-1/5'>
                                    <TextField
                                        select
                                        label="Structure"
                                        value={row.structure}
                                        onChange={e => handleChange(row.id, "structure", e.target.value)}
                                        sx={{ width: '100%' }}
                                    >
                                        <MenuItem value="H">H</MenuItem>
                                        <MenuItem value="Ogg">Ogg</MenuItem>
                                        <MenuItem value="Og">Og</MenuItem>
                                        <MenuItem value="Om">Om</MenuItem>
                                        <MenuItem value="Of">Of</MenuItem>
                                        <MenuItem value="Off">Off </MenuItem>
                                        <MenuItem value="Opl">Opl </MenuItem>
                                        <MenuItem value="D">D </MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>

                    <div className='flex justify-around'>
                        <Button variant="outlined" onClick={handleAddRow} sx={{ mt: 2 }} className='w-2/5'>
                            Add Row
                        </Button>
                        <Button variant="outlined" sx={{ mt: 2 }} onClick={handleClassify} className='w-2/5'>
                            Classify
                        </Button>
                    </div>
                </Box>
            </div>
            <div className="flex flex-col h-screen items-center justify-center mx-10">
                <Toolbar />
                {classifyHelper}
            </div>
        </div>
    );

};

export default Classify;