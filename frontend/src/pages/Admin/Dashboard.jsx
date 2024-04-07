import React, { useEffect, useRef } from "react";
import { useState } from "react";
import apiInstance from "../../../Api";
import Chart from "chart.js/auto";
import { FaCalendarAlt } from "react-icons/fa";
import SideBar from "../../components/Header/SideBar";
import { Pie } from "react-chartjs-2";
const Dashboard = () => {
  const [totalusers, setTotalUsers] = useState(0);
  const [totalInstructor, setTotalInstructor] = useState(0);
  const [totalcourse, setTotalCourse] = useState(0);
  const [totalPurchasedCourses, setTotalPurchasedCourses] = useState({});
  const [yearlyRevenue, setYearlyRevenue] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [isYearlyView, setIsYearlyView] = useState(true);

  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await apiInstance.get(`api/admin/countuser`);
        setTotalUsers(userResponse.data.count);

        const instructorResponse = await apiInstance.get(
          `api/admin/countinstructor`
        );
        setTotalInstructor(instructorResponse.data.count);

        const courseResponse = await apiInstance.get(`api/admin/countcourse`);
        setTotalPurchasedCourses(courseResponse.data);
        setTotalCourse(courseResponse.data.course);

        const yearlyRevenue = await apiInstance.get(`api/admin/yearlyrevenue`);

        setYearlyRevenue(yearlyRevenue.data);

        const monthlyRevenue = await apiInstance.get(
          `api/admin/monthlyrevenue`
        );
        setMonthlyRevenue(monthlyRevenue.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      updateChart();
    }
  }, [isYearlyView, yearlyRevenue, monthlyRevenue]);

  useEffect(() => {
    if (Object.keys(totalPurchasedCourses)) {
      updatePurchasedCoursesChart();
    }
  }, [totalPurchasedCourses]);

  const updateChart = () => {
    const ctx = chartRef.current.getContext("2d");
    let data = {};
    let options = {};

    if (isYearlyView) {
      data = {
        labels: yearlyRevenue.map((data) => data.year),
        datasets: [
          {
            label: "Yearly Revenue",
            data: yearlyRevenue.map((data) => data.revenue),
            borderColor: "blue",
            borderWidth: 1,
            fill: false,
          },
        ],
      };
      options = {
        scales: {
          x: {
            type: "category",
            beginAtZero: true,
            title: {
              display: true,
              text: "Year",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Revenue",
            },
          },
        },
      };
    } else {
      const monthLabels = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];
      data = {
        labels: monthLabels,
        datasets: [
          {
            label: "Monthly Revenue",
            data: monthlyRevenue.map((data) => data.revenue),
            borderColor: "green",
            borderWidth: 1,
            fill: false,
          },
        ],
      };
      options = {
        scales: {
          x: {
            type: "category",
            beginAtZero: true,
            title: {
              display: true,
              text: "Month",
            },
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Revenue",
            },
          },
        },
      };
    }

    if (chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    chartRef.current.chart = new Chart(ctx, {
      type: "line",
      data,
      options,
    });
  };

  const updatePurchasedCoursesChart = () => {
    const existingChart = Chart.getChart("purchasedCoursesChart");
    if (existingChart) {
      existingChart.destroy();
    }
    const labels = Object.keys(totalPurchasedCourses);
    const data = Object.values(totalPurchasedCourses);
    const ctx = document.getElementById("purchasedCoursesChart");

    new Chart(ctx, {
      type: "pie",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.6)",
              "rgba(54, 162, 235, 0.6)",
            ],
          },
        ],
      },
    });
  };

  const handleToggleView = () => {
    setIsYearlyView(!isYearlyView);
  };

  const currentMonth = new Date().getMonth() + 1;
  const currentMonthRevenue = monthlyRevenue.find(
    (data) => data.month === currentMonth
  );
  const currentYear = new Date().getFullYear();
  const currentYearRevenue = yearlyRevenue.find(
    (data) => data.year === currentYear
  );

  return (
    <>
      <div className="flex">
        <SideBar />

        <main className="w-full  md:w-[calc(100%-256px)] md:ml-6 bg-gray-200 min-h-screen transition-all main">
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col flex-grow ml-4">
                    <div className="text-sm text-gray-500">Monthly Revenue</div>
                    <div className="font-bold text-lg">
                      {currentMonthRevenue && (
                        <div>{currentMonthRevenue.revenue}</div>
                      )}
                    </div>
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
                    <div className="font-bold text-lg">
                      {currentYearRevenue && (
                        <div>{currentYearRevenue.revenue}</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleToggleView}
            className={`bg-${
              isYearlyView ? "green" : "blue"
            }-500 text-white rounded-full py-0 px-1 hover:bg-${
              isYearlyView ? "green" : "blue"
            }-600 focus:outline-none focus:ring-2 focus:ring-${
              isYearlyView ? "green" : "blue"
            }-500`}
            style={{
              minWidth: "16px",
              fontSize: "12px",
              fontWeight: "bold",
              marginLeft: "12px",
              height: "19px",
            }}
          >
            {isYearlyView ? "Show Monthly Revenue" : "Show Yearly Revenue"}
          </button>

          <div className="flex">
            <div
              className="chart-container"
              style={{ position: "relative", width: "40vw", flex: 1 }}
            >
              <canvas ref={chartRef} style={{ height: "220px" }}></canvas>
            </div>

            <div
              className="chart-container"
              style={{
                position: "relative",
                height: "65vh",
                width: "150vw",
                flex: 1,
              }}
            >
              <canvas id="purchasedCoursesChart"></canvas>
            </div>
          </div>
          <div />
        </main>
      </div>
      <script src="https://unpkg.com/@popperjs/core@2"></script>
    </>
  );
};

export default Dashboard;
