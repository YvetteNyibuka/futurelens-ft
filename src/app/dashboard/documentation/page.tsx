"use client";

import React from "react";
import { Book, FileText, Info, Database, Users, Home } from "lucide-react";

export default function DocumentationPage() {
  return (
    <div className="space-y-6 ml-4">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center">
          <Book className="mr-3 h-8 w-8" />
          <div>
            <h1 className="text-2xl font-bold">Data Documentation</h1>
            <p className="text-blue-100 mt-1">
              Understanding DHS survey variables and codes
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <FileText className="mr-2 h-5 w-5 text-blue-600" />
            Quick Navigation
          </h2>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="#household"
              className="flex items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Home className="mr-3 h-5 w-5 text-green-600" />
              <span className="text-black">Household Variables</span>
            </a>
            <a
              href="#person"
              className="flex items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Users className="mr-3 h-5 w-5 text-blue-600" />
              <span className="text-black">Person Variables</span>
            </a>
            <a
              href="#women"
              className="flex items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Users className="mr-3 h-5 w-5 text-pink-600" />
              <span className="text-black">Women Variables</span>
            </a>
            <a
              href="#men"
              className="flex items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Users className="mr-3 h-5 w-5 text-indigo-600" />
              <span className="text-black">Men Variables</span>
            </a>
            <a
              href="#child"
              className="flex items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Users className="mr-3 h-5 w-5 text-purple-600" />
              <span className="text-black">Child Variables</span>
            </a>
            <a
              href="#calendar"
              className="flex items-center p-3 border rounded-lg hover:bg-blue-50 transition-colors"
            >
              <Database className="mr-3 h-5 w-5 text-orange-600" />
              <span className="text-black">Calendar Variables</span>
            </a>
          </div>
        </div>
      </div>

      {/* Household Variables Section */}
      <div id="household" className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Home className="mr-2 h-5 w-5 text-green-600" />
            Household Variables (HV)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Variables collected at the household level in DHS surveys
          </p>
        </div>
        <div className="p-4">
          <div className="space-y-6">
            {/* Household Identification */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                Household Identification Variables
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">HHID:</span>
                    <span className="text-black">
                      Household ID (unique identifier for each household)
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV000:</span>
                    <span className="text-black">
                      Country code and survey type
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV001:</span>
                    <span className="text-black">
                      Cluster number (primary sampling unit)
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV002:</span>
                    <span className="text-black">
                      Household number within cluster
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV003:</span>
                    <span className="text-black">
                      Household line number in sample
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV004:</span>
                    <span className="text-black">Ultimate area unit</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV005:</span>
                    <span className="text-black">Household sample weight</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interview Information */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                Interview Information
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV006:</span>
                    <span className="text-black">Month of interview</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV007:</span>
                    <span className="text-black">Year of interview</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV008:</span>
                    <span className="text-black">
                      Date of interview (Century Month Code)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Household Composition */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                Household Composition
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV009:</span>
                    <span className="text-black">
                      Number of usual household members
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV010:</span>
                    <span className="text-black">
                      Number of usual residents
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV011:</span>
                    <span className="text-black">
                      Number of women eligible for interview
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV012:</span>
                    <span className="text-black">
                      Number of women interviewed
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV013:</span>
                    <span className="text-black">
                      Number of de jure members
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV014:</span>
                    <span className="text-black">
                      Number of children under 5
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV015:</span>
                    <span className="text-black">
                      Result of household interview
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV016:</span>
                    <span className="text-black">Day of interview</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV017:</span>
                    <span className="text-black">Number of visits made</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV018:</span>
                    <span className="text-black">
                      Number of men eligible for interview
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV019:</span>
                    <span className="text-black">
                      Number of men interviewed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Geographic & Administrative */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                Geographic & Administrative
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV020:</span>
                    <span className="text-black">Urban/rural residence</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV021:</span>
                    <span className="text-black">Region/province</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV022:</span>
                    <span className="text-black">
                      Sample domain for surveys
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV023:</span>
                    <span className="text-black">
                      Stratification used in sample design
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV024:</span>
                    <span className="text-black">Province/region code</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV025:</span>
                    <span className="text-black">
                      Type of place of residence
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV026:</span>
                    <span className="text-black">Altitude in meters</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV027:</span>
                    <span className="text-black">
                      Distance to national road
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV028:</span>
                    <span className="text-black">
                      Distance to regional road
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Water, Sanitation & Housing */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                Water, Sanitation & Housing
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV201:</span>
                    <span className="text-black">Source of drinking water</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV204:</span>
                    <span className="text-black">
                      Time to get to water source
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV205:</span>
                    <span className="text-black">Type of toilet facility</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV206:</span>
                    <span className="text-black">Has electricity</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV207:</span>
                    <span className="text-black">Has radio</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV208:</span>
                    <span className="text-black">Has television</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV209:</span>
                    <span className="text-black">Has refrigerator</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV210:</span>
                    <span className="text-black">Has bicycle</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV211:</span>
                    <span className="text-black">Has motorcycle/scooter</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV212:</span>
                    <span className="text-black">Has car/truck</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV213:</span>
                    <span className="text-black">Main floor material</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV214:</span>
                    <span className="text-black">Main wall material</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV215:</span>
                    <span className="text-black">Main roof material</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV217:</span>
                    <span className="text-black">Has telephone</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV218:</span>
                    <span className="text-black">Has computer</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV219:</span>
                    <span className="text-black">Has agricultural land</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV220:</span>
                    <span className="text-black">
                      Has livestock/farm animals
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV221:</span>
                    <span className="text-black">
                      Number of rooms for sleeping
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV225:</span>
                    <span className="text-black">
                      Share toilet with other households
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">HV226:</span>
                    <span className="text-black">Type of cooking fuel</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Survey-Specific Variables */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                Survey-Specific Variables (Rwanda)
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-20">SHCOMMU:</span>
                    <span className="text-black">
                      Community-specific variable
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-20">SHINTER:</span>
                    <span className="text-black">
                      Interview-specific variable
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-20">SHLANG:</span>
                    <span className="text-black">Language of interview</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-20">SHSECTE:</span>
                    <span className="text-black">Sector information</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-20">SHTIME:</span>
                    <span className="text-black">Time-related variable</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-20">V73:</span>
                    <span className="text-black">
                      Respondent's relationship to household head
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Person Variables Section */}
      <div id="person" className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="mr-2 h-5 w-5 text-blue-600" />
            Person Variables (HV100s)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Variables collected for each person in the household
          </p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-bold text-black w-16">HVIDX:</span>
                <span className="text-black">
                  Person's line number in household
                </span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">HV101:</span>
                <span className="text-black">
                  Relationship to household head
                </span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">HV102:</span>
                <span className="text-black">Usual resident of household</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">HV103:</span>
                <span className="text-black">
                  Slept in household last night
                </span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">HV104:</span>
                <span className="text-black">Sex of household member</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">HV105:</span>
                <span className="text-black">Age in completed years</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-bold text-black w-16">HV106:</span>
                <span className="text-black">
                  Highest educational level attended
                </span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">HV107:</span>
                <span className="text-black">
                  Highest year of education completed
                </span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">HV108:</span>
                <span className="text-black">Educational attainment</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">HV109:</span>
                <span className="text-black">Currently attending school</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">HV110:</span>
                <span className="text-black">
                  Literacy (can read a sentence)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Women Variables Section */}
      <div id="women" className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="mr-2 h-5 w-5 text-pink-600" />
            Women Variables (V)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Variables from women's questionnaire (reproductive age 15-49)
          </p>
        </div>
        <div className="p-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                Basic Information
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">CASEID:</span>
                    <span className="text-black">
                      Unique case identifier for woman
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V001:</span>
                    <span className="text-black">Cluster number</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V002:</span>
                    <span className="text-black">Household number</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V003:</span>
                    <span className="text-black">Woman's line number</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V012:</span>
                    <span className="text-black">Current age</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">V025:</span>
                    <span className="text-black">
                      Type of place of residence
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V106:</span>
                    <span className="text-black">
                      Highest educational level
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V502:</span>
                    <span className="text-black">Current marital status</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V190:</span>
                    <span className="text-black">Wealth index</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                Fertility & Family Planning
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">V201:</span>
                    <span className="text-black">Total children ever born</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V213:</span>
                    <span className="text-black">Currently pregnant</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V301:</span>
                    <span className="text-black">
                      Knowledge of contraceptive methods
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V312:</span>
                    <span className="text-black">
                      Current contraceptive method
                    </span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">V404:</span>
                    <span className="text-black">Currently breastfeeding</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V445:</span>
                    <span className="text-black">Attended antenatal care</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">V458:</span>
                    <span className="text-black">Place of delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Men Variables Section */}
      <div id="men" className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="mr-2 h-5 w-5 text-indigo-600" />
            Men Variables (MV)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Variables from men's questionnaire (age 15-59)
          </p>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-bold text-black w-16">MV001:</span>
                <span className="text-black">Cluster number</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">MV002:</span>
                <span className="text-black">Household number</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">MV003:</span>
                <span className="text-black">Man's line number</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">MV012:</span>
                <span className="text-black">Current age</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">MV025:</span>
                <span className="text-black">Type of place of residence</span>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-bold text-black w-16">MV106:</span>
                <span className="text-black">Highest educational level</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">MV502:</span>
                <span className="text-black">Current marital status</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">MV190:</span>
                <span className="text-black">Wealth index</span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">MV301:</span>
                <span className="text-black">
                  Knowledge of contraceptive methods
                </span>
              </div>
              <div className="flex">
                <span className="font-bold text-black w-16">MV714:</span>
                <span className="text-black">Partner works</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Child Variables Section */}
      <div id="child" className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Users className="mr-2 h-5 w-5 text-purple-600" />
            Child Variables (B, H)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Variables for children born to interviewed women
          </p>
        </div>
        <div className="p-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                Birth History
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">CASEID:</span>
                    <span className="text-black">Mother's case identifier</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">BIDX:</span>
                    <span className="text-black">Birth order index</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">B1:</span>
                    <span className="text-black">Month of birth</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">B2:</span>
                    <span className="text-black">Year of birth</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">B4:</span>
                    <span className="text-black">Sex of child</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">B5:</span>
                    <span className="text-black">Child still alive</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">B7:</span>
                    <span className="text-black">Age at death (months)</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">B8:</span>
                    <span className="text-black">Current age (months)</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">B11:</span>
                    <span className="text-black">Preceding birth interval</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-3 pb-2 border-b">
                Health & Nutrition (Children under 5)
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">H1:</span>
                    <span className="text-black">Height/length (cm)</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">H2:</span>
                    <span className="text-black">Weight (kg)</span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">H3:</span>
                    <span className="text-black">Height-for-age z-score</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="font-bold text-black w-16">H5:</span>
                    <span className="text-black">
                      Weight-for-height z-score
                    </span>
                  </div>
                  <div className="flex">
                    <span className="font-bold text-black w-16">H7:</span>
                    <span className="text-black">Weight-for-age z-score</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Variables Section */}
      <div id="calendar" className="bg-white rounded-lg shadow border">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Database className="mr-2 h-5 w-5 text-orange-600" />
            Calendar Variables (VCAL)
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Month-by-month contraceptive and birth calendar data
          </p>
        </div>
        <div className="p-4">
          <div className="space-y-2 text-sm">
            <div className="flex">
              <span className="font-bold text-black w-20">VCAL_1:</span>
              <span className="text-black">
                Monthly contraceptive use and pregnancy history
              </span>
            </div>
            <div className="flex">
              <span className="font-bold text-black w-20">VCAL_2:</span>
              <span className="text-black">
                Reasons for discontinuation of contraceptive methods
              </span>
            </div>
            <div className="flex">
              <span className="font-bold text-black w-20">BIDX:</span>
              <span className="text-black">
                Birth index for calendar entries
              </span>
            </div>
            <div className="flex">
              <span className="font-bold text-black w-20">KIDX:</span>
              <span className="text-black">
                Child index for calendar entries
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
        <div className="flex items-start">
          <Info className="mr-3 h-5 w-5 text-blue-600 mt-1 shrink-0" />
          <div>
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Quick Reference
            </h3>
            <ul className="space-y-1 text-sm text-blue-800">
              <li>
                <strong>HV variables:</strong> Household-level variables in DHS
                surveys
              </li>
              <li>
                <strong>SH variables:</strong> Survey-specific variables for
                Rwanda
              </li>
              <li>
                <strong>Sample weights:</strong> Use HV005 for household-level
                analysis
              </li>
              <li>
                <strong>Geographic codes:</strong> HV001 (cluster), HV021
                (region), HV024 (province)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
