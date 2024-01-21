import React, { useEffect, useState } from 'react'
import apiInstance from '../../../Api'
import { useParams } from 'react-router-dom'
import { Link } from '@mui/material'
const CourseView = () => {
const {purchaseId}=useParams()
const [course,setCourse]=useState(null)
   useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await apiInstance.get(`/api/users/${purchaseId}/course`)
                console.log(response.data.course,'resddddddddddddddddd');
setCourse(response.data.course)
            } catch (error) {
                console.error('Error fetching course',error);
            }
        }
        fetchCourse()
},[purchaseId])

  return (
    <>
      {/* component */}
      <section className="max-w-2xl px-6 py-8 mx-auto bg-white dark:bg-gray-900">
        <h2 className="font-bold text-3xl ">Starting Learning !!</h2>
        <main className="mt-8">
          <h2 className="mt-6 text-gray-700 dark:text-gray-200"></h2>
          {course && (
            <>
              <h2 className="mt-6 text-gray-700 dark:text-gray-200">
                {course.courseName}
              </h2>
              <p className="mt-2 leading-loose text-gray-600 dark:text-gray-300">
                {course.description}
                {/*  */}
              </p>
              {course.modules && course.modules.length > 0 && (
                <>
                  <h3 className="text-xl font-semibold mb-2">Modules</h3>
                  {course.modules.map((module) => (
                    <div key={module._id} className="mb-4">
                      <h4 className="text-lg font-medium">{module.title}</h4>
                      {/* <p className="text-gray-600 dark:text-gray-300">{module.description}</p> */}

                      {module.videos && module.videos.length > 0 && (
                        <div className="mt-2">
                          <h5 className="text-md font-semibold mb-2">Videos</h5>
                          {module.videos.map((video) => (
                            <div key={video._id} className="mb-2">
                              <p className="text-gray-600 dark:text-gray-300">
                                {video.title}
                              </p>
                               
                                
                                <video
                                  className="w-full h-48 rounded-lg"
                                  controls
                                >
                                  <source src={video.url} type="video/mp4" />
                                </video>
                           
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </>
              )}
            </>
          )}
        </main>
      </section>
    </>
  );
}

export default CourseView
