require 'rails_helper'

fb_test_user_name = 'Will Test'
fb_test_user_email = 'will_sivsjqv_test@tfbnw.net'
fb_test_user_pass =  'will_will_test'

RSpec.feature "FacebookAuthentications", type: :feature do
  scenario "Signing up, bad username", js: true do
    visit root_path

    click_link 'Sign in with facebook'
    click_button 'Sign in with Facebook'

    expect {
      within_window(page.driver.browser.window_handles.last) do
        fill_in('email', :with => fb_test_user_email )
        fill_in('pass',  :with => fb_test_user_pass  )
        click_on('Log In')
      end

      Capybara.using_wait_time(20) { expect(page).to have_content("User #{fb_test_user_name} joined") }
    }.to change(User, :count).by(1)

    # logout
    page.find('.glyphicon.glyphicon-remove').click
    Capybara.using_wait_time(20) { expect(page).to have_content('Sign in with Facebook') }
  end
end
