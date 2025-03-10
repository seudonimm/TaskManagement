package com.taskmanagement

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {
  
  private val REQUEST_CODE_PERMISSION = 1
  
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  override fun getMainComponentName(): String = "TaskManagement"

  /**
   * Returns the instance of the [ReactActivityDelegate]. We use [DefaultReactActivityDelegate]
   * which allows you to enable New Architecture with a single boolean flags [fabricEnabled]
   */
  override fun createReactActivityDelegate(): ReactActivityDelegate =
      DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
  
  /**
   * Check and request calendar permissions at runtime
   */
  override fun onStart() {
    super.onStart()
    requestCalendarPermission()
  }

  private fun requestCalendarPermission() {
    // Check if the permissions are already granted
    if (ContextCompat.checkSelfPermission(this, Manifest.permission.WRITE_CALENDAR) != PackageManager.PERMISSION_GRANTED ||
        ContextCompat.checkSelfPermission(this, Manifest.permission.READ_CALENDAR) != PackageManager.PERMISSION_GRANTED) {
      
      // Request the permissions
      ActivityCompat.requestPermissions(this, 
        arrayOf(Manifest.permission.WRITE_CALENDAR, Manifest.permission.READ_CALENDAR), 
        REQUEST_CODE_PERMISSION)
    }
  }
  
  // Handle the permission request result
  override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, grantResults: IntArray) {
    super.onRequestPermissionsResult(requestCode, permissions, grantResults)
    
    if (requestCode == REQUEST_CODE_PERMISSION) {
      if (grantResults.isNotEmpty() && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
        // Permission granted
        // You can now proceed to add events to the calendar
      } else {
        // Permission denied
        // Show a message explaining that the app needs the permission to add events
      }
    }
  }
}
