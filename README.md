# Technical-test
# Orders Dashboard 

A modern, responsive dashboard built with Angular and Plotly.js for visualizing and managing order data. Features a sortable table with dynamic filtering and interactive charts.

## Features

- 📊 Dynamic data visualization with Plotly.js
- 📱 Fully responsive design
- 🔍 Sortable and filterable orders table
- 📈 Interactive pie and bar charts
- 🎨 Clean, modern UI with status indicators
- ⚡ Real-time chart updates based on filters

## Tech Stack

- Angular 19.2
- Plotly.js
- TypeScript
- RxJS

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/haouari-mohamed/Technical-test.git
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── orders-table/
│   │   └── orders-chart/
│   ├── models/
│   │   └── order.model.ts
│   ├── services/
│   │   └── order.service.ts
│   └── app.component.ts
└── global_styles.css
```

## Features in Detail

### Orders Table
- Sort by Order ID and Customer Name
- Filter orders by status (All, Delivered, Pending, Cancelled)
- Color-coded status badges
- Responsive layout

### Charts
- Toggle between Pie and Bar charts
- Auto-updates based on table filters
- Status distribution visualization
- Interactive tooltips
- Responsive sizing

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


## Acknowledgments

- [Angular](https://angular.io/)
- [Plotly.js](https://plotly.com/javascript/)

