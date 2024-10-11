"use client";

import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Spreadsheet, { CellBase, Matrix } from "react-spreadsheet";
import { ScatterChart } from '@mui/x-charts/ScatterChart';


import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const Plot: React.FC = () => {
    const Tableau10 = [
        '#4e79a7',
        '#f28e2c',
        '#e15759',
        '#76b7b2',
        '#59a14f',
        '#edc949',
        '#af7aa1',
        '#ff9da7',
        '#9c755f',
        '#bab0ab',
    ];
    const [color, setColor] = React.useState('#4e79a7');
    const handleColorChange = (event: React.MouseEvent<HTMLElement>, nextColor: string) => {
        setColor(nextColor);
    };


    const colNames = ['Ni (mg/g)', 'Co (mg/g)', 'Ga (μg/g)', 'Ge (μg/g)', 'Au (μg/g)', 'As (μg/g)']
    const [data, setData] = useState<Matrix<CellBase<any>>>(
        [...Array(20)].map(e => Array(7))
    );
    const [plotData, setPlotData] = useState<{ id: number, x: number, y: number }[] | null>(null);
    const [xIndex, setXIndex] = useState<number>(0); // Default to the first column
    const [yIndex, setYIndex] = useState<number>(1); // Default to the second column

    useEffect(() => {
        handlePlot();
    }, [xIndex, yIndex]);

    const handlePlot = () => {

        const plotData = data
            .map((row, index) => {
                const x = row[xIndex]?.value;
                const y = row[yIndex]?.value;
                const invalidX = x === null || x === undefined || x.trim() === '' || isNaN(Number(x))
                const invalidY = y === null || y === undefined || y.trim() === '' || isNaN(Number(y))
                return !invalidX && !invalidY ? { id: index, x: x as number, y: y as number } : null;
            })
            .filter(point => point !== null);

        if (plotData.length > 0) {
            setPlotData(plotData as { id: number, x: number, y: number }[]);
        }
    };

    // change later

    const handleXChange = (event: SelectChangeEvent) => {
        setXIndex(parseInt(event.target.value));
    };
    const handleYChange = (event: SelectChangeEvent) => {
        setYIndex(parseInt(event.target.value));
    };
    var otherSetting = {
        height: 400,
        xAxis: [{ label: colNames[xIndex], min: 0 }],
        yAxis: [{ label: colNames[yIndex], min: 0 }],
        grid: { horizontal: true },
        sx: {
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
        },
    };

    return (
        <div className="grid grid-cols-2 gap-3">
            <div className="my-3 overflow-auto">
                <Toolbar />
                <Spreadsheet columnLabels={colNames} data={data} onChange={setData} />
                <div className='flex justify-around'>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">X-Axis</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={xIndex.toString()}
                                label="X-Axis"
                                onChange={handleXChange}
                            >
                                <MenuItem value={0}>Ni (mg/g)</MenuItem>
                                <MenuItem value={1}>Co (mg/g)</MenuItem>
                                <MenuItem value={2}>Ga (μg/g)</MenuItem>
                                <MenuItem value={3}>Ge (μg/g)</MenuItem>
                                <MenuItem value={4}>Au (μg/g)</MenuItem>
                                <MenuItem value={5}>As (μg/g)</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Y-Axis</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={yIndex.toString()}
                                label="Y-Axis"
                                onChange={handleYChange}
                            >
                                <MenuItem value={0}>Ni (mg/g)</MenuItem>
                                <MenuItem value={1}>Co (mg/g)</MenuItem>
                                <MenuItem value={2}>Ga (μg/g)</MenuItem>
                                <MenuItem value={3}>Ge (μg/g)</MenuItem>
                                <MenuItem value={4}>Au (μg/g)</MenuItem>
                                <MenuItem value={5}>As (μg/g)</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>


                    <ToggleButtonGroup
                        // orientation="vertical"
                        value={color}
                        exclusive
                        onChange={handleColorChange}
                    >
                        {Tableau10.map((value) => (
                            <ToggleButton key={value} value={value} sx={{ p: 1 }}>
                                <div
                                    style={{
                                        width: 15,
                                        height: 15,
                                        backgroundColor: value,
                                        display: 'inline-block',
                                    }}
                                />
                            </ToggleButton>
                        ))}
                    </ToggleButtonGroup>
                    <Button variant="outlined" onClick={handlePlot}>
                        Plot
                    </Button>
                </div>
            </div>
            <div className="flex flex-col h-screen items-center justify-center mx-10">
                <Toolbar />
                {plotData && (
                    <ScatterChart
                        width={600}
                        // height={400}
                        series={[{ data: plotData, color }]}
                        {...otherSetting}
                    />
                )}
            </div>
        </div>
    );
};

export default Plot;
