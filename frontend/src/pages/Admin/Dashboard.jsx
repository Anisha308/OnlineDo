import React, { useEffect, useRef } from "react";
import { useState } from "react";
import apiInstance from "../../../Api";
import { Chart } from "chart.js";

const Dashboard = () => {
  const chartRef = useRef(null);

  const [totalusers, setTotalUsers] = useState(0);
  const [totalInstructor, setTotalInstructor] = useState(0);
  const [totalcourse, setTotalCourse] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await apiInstance.get(`api/admin/countuser`);
        console.log(userResponse.data.count);
        setTotalUsers(userResponse.data.count);

        const instructorResponse = await apiInstance.get(
          `api/admin/countinstructor`
        );
        setTotalInstructor(instructorResponse.data.count);

        // const courseResponse = await apiInstance.get(`api/admin/countcourse`);
        // setTotalCourse(courseResponse.data.count);

        const yearlyRevenue = await apiInstance.get(`api/admin/yearlyrevenue`);
        console.log(yearlyRevenue.data.revenue, "jj");
        setYearlyRevenue(yearlyRevenue.data.revenue);

        const monthlyRevenue = await apiInstance.get(
          `api/admin/monthlyrevenue`
        );
        console.log(monthlyRevenue, "mk");
        setMonthlyRevenue(monthlyRevenue.data.revenue);
        drawChart();
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const drawChart = () => {
    if (chartRef.current && monthlyRevenue.length > 0) {
      new Chart(chartRef.current, {
        type: "line",
        data: {
          labels: monthlyRevenue.map((data, index) => `Month ${index + 1}`),
          datasets: [
            {
              label: "Monthly Revenue",
              data: monthlyRevenue.map((data) => data.revenue),
              backgroundColor: "rgba(75, 192, 192, 0.2)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  };
  return (
    <>
      {/* component */}
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <link rel="preconnect" href="https://fonts.bunny.net" />

      <title>Admin Panel</title>

      <main className="w-full md:w-[calc(100%-256px)] md:ml-64 bg-gray-200 min-h-screen transition-all main">
        {/* component */}
        <div className="p-4 w-full">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-blue-100 text-blue-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">Users</div>
                  <div className="font-bold text-lg">{totalusers}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-green-100 text-green-500">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">Instructors</div>
                  <div className="font-bold text-lg">{totalInstructor}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-orange-100 text-orange-500">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    ></path>
                  </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500">Monthly Revenue</div>
                  <div className="font-bold text-lg">{monthlyRevenue}</div>
                </div>
              </div>
            </div>
            <div className="col-span-12 sm:col-span-6 md:col-span-3">
              <div className="flex flex-row bg-white shadow-sm rounded p-4">
                <div className="flex items-center justify-center flex-shrink-0 h-12 w-12 rounded-xl bg-red-100 text-red-500">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex flex-col flex-grow ml-4">
                  <div className="text-sm text-gray-500"> Yearly Revenue</div>
                  <div className="font-bold text-lg">{yearlyRevenue}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-md shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
          <div className="flex items-center justify-center">
            <div className="w-full max-w-lg">
              {/* Graph */}
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                {/* Graph area */}
                <div className="flex justify-between p-4">
                  {[...Array(12)].map((_, index) => (
                    <div
                      key={index}
                      className="text-xs text-gray-500"
                    >{`Month ${index + 1}`}</div>
                  ))}
                </div>
                <div className="flex items-end h-24 p-4">
                  {[...Array(12)].map((_, index) => (
                    <div
                      key={index}
                      className={`w-1/12 bg-blue-${index + 5}00`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-12 md:col-span-6">
          <div className="bg-white border border-gray-100 shadow-md shadow-black/5 p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-4">Monthly Revenue</h2>
            <svg
              viewBox="0 0 500 300"
              width="100%"
              height="auto"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* X-axis */}
              <line x1="50" y1="250" x2="450" y2="250" stroke="black" />
              {/* Y-axis */}
              <line x1="50" y1="50" x2="50" y2="250" stroke="black" />

              {/* X-axis labels */}
              {/* {monthlyRevenue.map((data, index) => (
                <circle
                  key={index}
                  cx={50 + index * 50}
                  cy={
                    250 -
                    (200 * data.revenue) /
                      Math.max(...monthlyRevenue.map((data) => data.revenue))
                  }
                  r="3"
                  fill="blue"
                />
              ))} */}

              {/* Y-axis labels */}
              <text x="20" y="50" fill="black" fontSize="12" textAnchor="end">
                0
              </text>
              {/* <text x="30" y="150" fill="black" fontSize="12" textAnchor="end">
                {Math.max(...monthlyRevenue.map((data) => data.revenue))}
              </text> */}

              {/* Data points */}
              {/* {monthlyRevenue.map((data, index) => (
                <circle
                  key={index}
                  cx={50 + index * 50}
                  cy={
                    250 -
                    (200 * data.revenue) /
                      Math.max(...monthlyData.map((data) => data.revenue))
                  }
                  r="3"
                  fill="blue"
                />
              ))} */}

              {/* Connecting lines */}
              {/* {monthlyRevenue.map(
                (data, index) =>
                  index < monthlyRevenue.length - 1 && (
                    <line
                      key={index}
                      x1={50 + index * 50}
                      y1={
                        250 -
                        (200 * data.revenue) /
                          Math.max(
                            ...monthlyRevenue.map((data) => data.revenue)
                          )
                      }
                      x2={50 + (index + 1) * 50}
                      y2={
                        250 -
                        (200 * monthlyRevenue[index + 1].revenue) /
                          Math.max(
                            ...monthlyRevenue.map((data) => data.revenue)
                          )
                      }
                      stroke="blue"
                    />
                  )
              )} */}
            </svg>
          </div>
        </div>
        {/* End Content */}
      </main>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

      <script src="https://unpkg.com/@popperjs/core@2"></script>
      <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </>
  );
};

export default Dashboard;
