require 'rails_helper'

RSpec.feature "Authentication with credentials", type: :feature do
  scenario "Signing up, bad username", js: true do
    visit root_path

    click_link 'Sign in with password'
    click_link '(don\'t have account yet?)'
    expect(page).to have_content('Please sign up')

    fill_in 'Username', with: ''
    find('#emailInput').set 'konkit@example.com'
    find('#passwordInput').set '321321321'
    find('#passwordConfirmationInput').set '321321321'
    click_button 'Submit'
    expect(page).to have_content('Username can\'t be blank')
  end

  scenario "Signing up, bad email", js: true do
    visit root_path

    click_link 'Sign in with password'
    click_link '(don\'t have account yet?)'
    expect(page).to have_content('Please sign up')

    fill_in 'Username', with: Faker::Name.name
    find('#emailInput').set ''
    find('#passwordInput').set '321321321'
    find('#passwordConfirmationInput').set '321321321'
    click_button 'Submit'
    expect(page).to have_content('Email can\'t be blank')
  end

  scenario "Signing up, bad password", js: true do
    visit root_path

    click_link 'Sign in with password'
    click_link '(don\'t have account yet?)'
    expect(page).to have_content('Please sign up')

    fill_in 'Username', with: Faker::Name.name
    find('#emailInput').set Faker::Internet.email
    find('#passwordInput').set ''
    find('#passwordConfirmationInput').set '321321321'
    click_button 'Submit'
    expect(page).to have_content('Password can\'t be blank')
  end

  scenario "Signing up, happy path", js: true do
    visit root_path

    click_link 'Sign in with password'
    click_link '(don\'t have account yet?)'
    expect(page).to have_content('Please sign up')

    username = Faker::Name.name

    fill_in 'Username', with: username
    find('#emailInput').set Faker::Internet.email
    find('#passwordInput').set '321321321'
    find('#passwordConfirmationInput').set '321321321'

    expect {
      click_button 'Submit'
      Capybara.using_wait_time(20) { expect(page).to have_content("User #{username} joined") }
    }.to change(User, :count).by(1)

    # logout
    page.find('.glyphicon.glyphicon-remove').click
    Capybara.using_wait_time(20) { expect(page).to have_content('Please sign in') }
  end

  scenario "Signing in", js: true do
    user = FactoryGirl.create(:user)

    visit root_path
    click_link 'Sign in with password'
    expect(page).to have_content('Please sign in')

    # User sign in
    find('#usernameInput').set user.email
    find('#passwordInput').set user.password
    click_button 'Submit'

    Capybara.using_wait_time(20) { expect(page).to have_content("User #{user.username} joined") }

    # logout
    page.find('.glyphicon.glyphicon-remove').click
    Capybara.using_wait_time(20) { expect(page).to have_content('Please sign in') }
  end
end
