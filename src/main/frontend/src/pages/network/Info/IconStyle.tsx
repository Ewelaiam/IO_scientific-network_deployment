
export function generateStyle(colors: string[], alpha = 1) {
    function hexToRgb(hex: string) {
        // Parse red, green, and blue values from hexadecimal string
        const red = parseInt(hex.substring(0, 2), 16);
        const green = parseInt(hex.substring(2, 4), 16);
        const blue = parseInt(hex.substring(4, 6), 16);
        return { red, green, blue };
    }
    let circleStyle;
    switch (colors.length) {
        case 1:
            {
                const color = hexToRgb(colors[0]);
                circleStyle = {
                    background: `rgba(${color.red}, ${color.green}, ${color.blue}, ${alpha})`,
                    backgroundSize: 'cover'
                };
            }
            break;
        case 2:
            {
                const color0 = hexToRgb(colors[0]);
                const color1 = hexToRgb(colors[1]);
                const gradientColors = `rgba(${color0.red}, ${color0.green}, ${color0.blue},${alpha}) 60%, 
                                            rgba(${color1.red}, ${color1.green}, ${color1.blue},${alpha}) 60%`;
                circleStyle = {
                    background: `linear-gradient(to right, ${gradientColors})`,
                };
            }
            break;
        case 3:
            {
                const color0 = hexToRgb(colors[0]);
                const color1 = hexToRgb(colors[1]);
                const color2 = hexToRgb(colors[2]);
                const gradientColors = `rgba(${color0.red}, ${color0.green}, ${color0.blue},${alpha})  45%, 
                                            rgba(${color1.red}, ${color1.green}, ${color1.blue},${alpha}) 45% 85%,
                                                rgba(${color2.red}, ${color2.green}, ${color2.blue},${alpha}) 85%`;

                circleStyle = {
                    background: `linear-gradient(to right, ${gradientColors})`,
                };
            }
            break;
        default:
            throw new Error("Invalid number of colors");
    }
    return circleStyle;
}
