import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import CreateTechnician from "./CreateTechnician";
import TechnicianList from "./TechnicianList";
import ServiceList from "./ServiceList";
import ServiceHistory from "./ServiceHistory";
import ManufacturerList from "./ManufacturerList";
import CreateManufacturer from "./CreateManufacturer";
import ScheduleService from "./ScheduleService";
import ListModels from "./ListModels";
import CreateModel from "./CreateModel";
import ListAutomobiles from "./ListAutomobiles";
import CreateAutomobile from "./CreateAutomobile";
import ListSalespersons from "./ListSalespersons";
import CreateCustomer from "./CreateCustomer";
import ListCustomers from "./ListCustomers";
import CreateSalesPerson from "./CreateSalesPerson";
import ListSales from "./ListSales";
import CreateSale from "./CreateSale";
import ListSalespersonHistory from "./ListSalespersonHistory";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="technicians/">
						<Route path="" element={<TechnicianList />} />
						<Route path="create/" element={<CreateTechnician />} />
					</Route>
					<Route path="appointments/">
						<Route path="" element={<ServiceList />} />
						<Route path="create/" element={<ScheduleService />} />
						<Route path="history" element={<ServiceHistory />} />
					</Route>
					<Route path="manufacturers/">
						<Route path="" element={<ManufacturerList />} />
						<Route path="create" element={<CreateManufacturer />} />
					</Route>
          <Route path="models/">
            <Route path="" element={<ListModels />} />
            <Route path="create/" element={<CreateModel />} />
          </Route>
					<Route path="automobiles/">
						<Route path="" element={<ListAutomobiles />} />
						<Route path="create/" element={<CreateAutomobile />} />
					</Route>
					<Route path="salespersons/">
						<Route path="" element={<ListSalespersons />}/>
						<Route path="create/" element={<CreateSalesPerson />}/>
					</Route>
					<Route path="customers/">
						<Route path="" element={<ListCustomers />}/>
						<Route path="create/" element={<CreateCustomer />}/>
					</Route>
					<Route path="sales/">
						<Route path="" element={<ListSales />}/>
						<Route path="create/" element={<CreateSale />}/>
						<Route path="history/" element={<ListSalespersonHistory />}/>
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
