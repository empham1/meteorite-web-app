"use client";

import React, { useState, useEffect } from "react";
import { Checkbox, ListItemText, Button, TextField, Grid, Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Spreadsheet, { CellBase, Matrix } from "react-spreadsheet";
import { ScatterChart } from "@mui/x-charts/ScatterChart";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import uclaData from '../public/data.json';

const valueFormatter = (value: number) => {
  // Format the value in scientific notation
  if (value >= 1 && value < 1000) {
    return value.toFixed();
  } else if (value < 1 && value >= 0.1) {
    return value.toFixed(1);
  } else if (value < 0.1 && value >= 0.01) {
    return value.toFixed(2);
  } else if (value < 0.01 && value >= 0.001) {
    return value.toFixed(3);
  }
  return value.toExponential();
};

const Plot: React.FC = () => {
  interface MyObject {
    x: number;
    y: number;
    label: string;
    id?: number;
    color?: string
  }

  const classic = [
    "#000000",
    "#0000ff",
    "#00ff00",
    "#ff0000",
    "#00ffff",
    "#ff00ff",
    "#ffff00"
  ];

  const Tableau10 = [
    "#1f77b4",
    "#ff7f0e",
    "#2ca02c",
    "#d62728",
    "#9467bd",
    "#8c564b",
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf'
  ]

  const [color, setColor] = React.useState("#000000");
  const handleColorChange = (event: React.MouseEvent<HTMLElement>, nextColor: string) => {
    setColor(nextColor);
  };

  const colNames = [
    "Cr (μg/g)", "Co (mg/g)", "Ni (mg/g)", "Cu (μg/g)", "Ga (μg/g)", "Ge (μg/g)", "As (μg/g)", "Mo (μg/g)", "Ru (μg/g)", "Rh (μg/g)", "Pd (μg/g)", "Sb (ng/g)", "W (μg/g)", "Re (ng/g)", "Os (μg/g)", "Ir (μg/g)", "Pt (μg/g)", "Au (μg/g)"
  ];

  const categoryNames = [
    "IIIAB",
    "IIC",
    "IID",
    "IIF",
    "IVB",
    "SBT",
    "IIIF",
    "IC",
    "IIAB",
    "IIIE",
    "IVA"
  ];

  const [data, setData] = useState<Matrix<CellBase<any>>>([...Array(20)].map((e) => Array(7)));
  const [plotData, setPlotData] = useState<{ id: number; x: number; y: number }[] | null>(null);
  const [overlayData, setOverlayData] = useState<{ id: number; x: number; y: number; color: string; label: string }[] | null>(null);
  const [xIndex, setXIndex] = useState<number>(0); // Default to the first column
  const [yIndex, setYIndex] = useState<number>(1); // Default to the second column
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // To track selected categories
  const [xMin, setXMin] = useState<number | string>(''); 
  const [xMinError, setXMinError] = useState<string>("");  // Error state while inputting x min
  const [xMinFinal, setXMinFinal] = useState<number>(0.0001); // Default to a small number
  const [yMin, setYMin] = useState<number | string>('');
  const [yMinError, setYMinError] = useState<string>("");  // Error state while inputting y min
  const [yMinFinal, setYMinFinal] = useState<number>(0.0001); // Default to a small number
  const [gridLines, setGridLines] = useState<boolean>(false);

  useEffect(() => {
    handlePlot();
  }, [xIndex, yIndex, selectedCategories]); // Re-run on changes to selected categories

  const handlePlot = () => {
    // Check if xMin is a valid number, set to default otherwise
    const xMinVal = (parseFloat(xMin.toString()) > 0) ? (parseFloat(xMin.toString())) : 0.01;
    setXMinFinal(xMinVal);
    const yMinVal = (parseFloat(yMin.toString()) > 0) ? (parseFloat(yMin.toString())) : 0.01;
    setYMinFinal(yMinVal);

    // Plot data for user input
    const plotData = data
      .map((row, index) => {
        const x = row[xIndex]?.value;
        const y = row[yIndex]?.value;
        const invalidX = x === null || x === undefined || x.trim() === "" || isNaN(Number(x));
        const invalidY = y === null || y === undefined || y.trim() === "" || isNaN(Number(y));
        return !invalidX && !invalidY ? { id: index, x: x as number, y: y as number } : null;
      })
      .filter((point) => point !== null);

    setPlotData(plotData as { id: number; x: number; y: number }[]);

    const overlayData = selectedCategories.map((category, index) => {
      const filteredCategory = uclaData.filter(item => item.label === category);
      console.log(category);
      console.log(filteredCategory);
      const categoryColor = Tableau10[index % Tableau10.length]; // Cycle through Tableau10 colors

      return filteredCategory
        .map((item, index) => {
          const x = [item.cr, item.co, item.ni, item.cu, item.ga, item.ge, item.as, item.mo, item.ru, item.rh, item.pd, item.sb, item.w, item.re, item.os, item.ir, item.pt, item.au][xIndex];
          const y = [item.cr, item.co, item.ni, item.cu, item.ga, item.ge, item.as, item.mo, item.ru, item.rh, item.pd, item.sb, item.w, item.re, item.os, item.ir, item.pt, item.au][yIndex];
          const label = item.label + ' | ' + item.meteorite;
          const invalidX = x === null || x === undefined || isNaN(Number(x));
          const invalidY = y === null || y === undefined || isNaN(Number(y));
          return !invalidX && !invalidY
            ? { id: index, x: x as number, y: y as number, color: categoryColor, label: label as string }
            : null;
        })
        .filter((point) => point !== null);
    }).flat();

    setOverlayData(overlayData as { id: number; x: number; y: number; color: string; label: string }[]);
  };

  const handleXChange = (event: SelectChangeEvent) => {
    setXIndex(parseInt(event.target.value));
  };
  const handleYChange = (event: SelectChangeEvent) => {
    setYIndex(parseInt(event.target.value));
  };
  const handleXMin = (value: number | string) => {
    setXMin(value);
    const parsedValue = parseFloat(value.toString());
    // Check if the parsed value is a valid number and greater than 0
    if (!isNaN(parsedValue) && parsedValue > 0) {  // Update the state with the new value
      setXMinError("");  // Clear error message
    } else {
      // Show an error message or keep the previous valid value
      setXMinError("Please enter a number greater than 0");
    }
  };
  const handleYMin = (value: number | string) => {
    setYMin(value);
    const parsedValue = parseFloat(value.toString());
    // Check if the parsed value is a valid number and greater than 0
    if (!isNaN(parsedValue) && parsedValue > 0) {  // Update the state with the new value
      setYMinError("");  // Clear error message
    } else {
      // Show an error message or keep the previous valid value
      setYMinError("Please enter a number greater than 0");
    }
  };
  const handleGridLines = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Update the state variable based on whether the checkbox is checked
    setGridLines(event.target.checked);
  };
  const handleCategoryChange = (event: SelectChangeEvent<typeof selectedCategories>) => {
    setSelectedCategories(event.target.value as string[]);
  };

  const otherSetting = {
    height: 400,
    grid: { horizontal: gridLines },
    sx: {
      [`& .${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translateX(-10px)",
      },
    },
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-3">
        <div className="my-3 overflow-auto">
          <Toolbar />
          <Spreadsheet columnLabels={colNames} data={data} onChange={setData} />
        </div>

        <div className="flex flex-col h-screen items-center justify-center mx-10">
          <Toolbar />
          {plotData && (
            <ScatterChart
              width={600}
              xAxis={[
                { scaleType: 'log', label: colNames[xIndex], min: xMinFinal, valueFormatter: valueFormatter },
              ]}
              yAxis={[
                { scaleType: 'log', label: colNames[yIndex], min: yMinFinal, valueFormatter: valueFormatter },
              ]}
              series={[
                { data: plotData, color, label: 'Input' },
                ...(overlayData
                  ? overlayData.map((categoryData, index) => ({
                    data: [{ x: categoryData.x, y: categoryData.y, id: categoryData.id }],
                    color: categoryData.color,
                    key: index,
                    label: categoryData.label,
                  }))
                  : []), // Overlay selected categories

              ]}
              {...otherSetting}
              slotProps={{ legend: { hidden: true } }}
            />
          )}
        </div>
      </div>
      {/* <div className="flex justify-between"> */}
      <div className="flex justify-between px-6 py-3">
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
              {colNames.map((col, index) => (
                <MenuItem key={index} value={index}>
                  {col}
                </MenuItem>
              ))}
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
              {colNames.map((col, index) => (
                <MenuItem key={index} value={index}>
                  {col}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Classes</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              multiple
              value={selectedCategories}
              label="Classes"
              onChange={handleCategoryChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {categoryNames.map((col, index) => (
                <MenuItem key={index} value={col}>
                  <Checkbox checked={selectedCategories.indexOf(col) > -1} />
                  <ListItemText primary={col} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <ToggleButtonGroup value={color} exclusive onChange={handleColorChange}>
          {classic.map((value) => (
            <ToggleButton key={value} value={value} sx={{ p: 1 }}>
              <div
                style={{
                  width: 15,
                  height: 15,
                  backgroundColor: value,
                  display: "inline-block",
                }}
              />
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <Box sx={{ maxWidth: 120 }}>
          <Grid item>
            <TextField
              type="number"
              label="X Min"
              value={xMin}
              onChange={e => handleXMin(e.target.value)}
              error={!!xMinError}  // Show error state if there's an error message
              helperText={xMinError}  // Display the error message
              fullWidth
            />
          </Grid>
        </Box>
        <Box sx={{ maxWidth: 120 }}>
          <Grid item>
            <TextField
              type="number"
              label="Y Min"
              value={yMin}
              onChange={e => handleYMin(e.target.value)}
              error={!!yMinError}  // Show error state if there's an error message
              helperText={yMinError}  // Display the error message
              fullWidth
            />
          </Grid>
        </Box>

        <MenuItem>
          <Checkbox checked={gridLines} onChange={handleGridLines} />
          <ListItemText primary={'Show Grid Lines'} />
        </MenuItem>


        <Button
          variant="outlined" onClick={handlePlot}>
          Plot
        </Button>
      </div>
    </div>
  );
};

export default Plot;

